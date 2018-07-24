// import { Database } from "arangojs";

// const dbServer = new Database();
// const db = dbServer.useDatabase("test");

// interface IUser {
//     firstname: string;
//     lastname: string;
//     age: number;

//     // relations: {
//     //     courses: ICourse;
//     // }

//     // ccourses: Relation<ICourse>;
// }

// interface ICourse {
//     name: string;
// }

type MappedType<T> = 
    T extends Field<infer U> ? U : 
    T extends ExecutableRelationQuery<infer U> ? MappedSchema<U> :
    T;

type MappedSchema<T> = { 
    [s in keyof T]: MappedType<T[s]>
};

class Field<Type> {
    private __type = "field";

    constructor() {

    }
}

class Relation<CollectionType extends Collection> {
    constructor(
        private readonly edgeName: string, 
        private readonly collectionConstructor: { new(...args: any[]) : CollectionType }) {

    }

    createQuery(variable: string) {
        return new RelationQueryBuilder("u", variable, this.edgeName, new this.collectionConstructor());
    }
}

// type Entity<Type> = { [s in keyof Type]: Field<Type[s]>; };

class Collection {
    constructor(public readonly collectionName: string) {

    }

    createQuery(variable: string) {
        return new QueryBuilder(this, variable);
    }
}





class UserCollection extends Collection {
    firstname = new Field<string>();
    lastname = new Field<string>();
    age = new Field<number>();
    courses = new Relation("teaches", CourseCollection);
}
const userCollection = new UserCollection("users");

class CourseCollection extends Collection {
    name = new Field<string>();
}
const courseCollection = new CourseCollection("courses");



class QueryBuilder<CollectionType extends Collection> {

    constructor(
        private readonly collection: CollectionType,
        private readonly variable: string) {
            
    }

    return<Schema>(schemaCreator: (collection: CollectionType) => Schema) {
        const proxy = createProxy(this.collection, this.variable);
        const schema = schemaCreator(proxy);
        return new ExecutableQuery<Schema>(this.collection.collectionName, this.variable, schema);
    }
}

class ExecutableQuery<Schema> {
    
    constructor(
        private readonly collectionName: string,
        private readonly variable: string,
        private readonly schema: Schema) {

    }

    toAQL(prettyPrint = false) {
        const fields = Object.entries(this.schema).map(([alias, field]) => {
            
            if(field instanceof ExecutableRelationQuery) {
                return `${alias}: (\n${field.toAQL()}\n)`;
            }

            return `${alias}: ${field}`;

        }).join(",\n");

        const query = `FOR ${this.variable} IN ${this.collectionName}\nRETURN {\n${fields}\n}`;

        return prettyPrint ? prettifyQuery(query) : query;
    }
    
    fetch() {
        // const result = await db.query(query);
        // return result.all() as Schema[];

        // return { } as Schema[];

        return { } as MappedSchema<Schema>;
    }
}

class RelationQueryBuilder<CollectionType extends Collection> {

    constructor(
        private readonly parentVariable: string,
        private readonly variable: string,
        private readonly edgeName: string,
        private readonly collection: CollectionType) {

    }

    return <Schema>(schemaCreator: (collection: CollectionType) => Schema) {
        const proxy = createProxy(this.collection, this.variable);        
        const schema = schemaCreator(proxy);        
        return new ExecutableRelationQuery<Schema>(this.parentVariable, this.edgeName, this.variable, schema);
    }
}

class ExecutableRelationQuery<Schema> {

    constructor(
        private readonly parentVariable: string,
        private readonly edgeName: string,
        private readonly variable: string,
        private readonly schema: Schema) {

    }

    toAQL(prettyPrint = false) {

        const fields = Object.entries(this.schema).map(([alias, field]) => {
            
            // if(field instanceof ExecutableRelationQuery) {
            //     return field.toAQL();
            // }

            return `${alias}: ${field}`;

        }).join(",\n");

        const query = `FOR ${this.variable} IN 1 OUTBOUND ${this.parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;

        return prettyPrint ? prettifyQuery(query) : query; 
    }

    fetch() {
        return {} as Schema;
    }
}

(async () => {

    // userCollection.createQuery("u").return(u => ({ firstname: u.firstname, lastname: u.lastname, age: u.age })).toAQL(),

    console.log(
        userCollection.createQuery("u")
            .return(u => ({ 
                firstname: u.firstname,
                lastname: u.lastname,
                age: u.age,

                courses: u.courses.createQuery("c")
                    .return(c => ({ userName: u.firstname, name: c.name })),
            }))
            .toAQL(true),
    );

})();

function createProxy(collection: Collection, variable: string) {
    return new Proxy(collection, {
        get: (target: any, key) => { 
            if(target[key] instanceof Field) {
                return `${variable}.${key.toString()}`;
            }
            return target[key]; 
        }
    });
}

function prettifyQuery(query: string, spaces = 2) {
    let indentation = 0;
    
    return query
        .split("\n")
        .map(line => {
            if(line.endsWith("}") || line.endsWith(")")) {
                indentation--;
            }

            const indentedLine = `${" ".repeat(indentation * spaces)}${line}`;
            
            if(line.endsWith("{") || line.endsWith("(")) {
                indentation++;
            }

            return indentedLine;
        })
        .join("\n");
}

















// type Diff<T, U> = T extends U ? never : T;
// // type NonNullable<T> = Diff<T, null | undefined>;

// function f<Model>(schema: { [s in keyof Model]?: boolean }) {
//     // return {} as Pick<Model, Extract<keyof Model, keyof typeof schema>>;
//     // return {} as Pick<Model, NonNullable<keyof typeof schema>>;

//     return {} as Model;
// }

// f<IUser>({ age: true, lastname: true }).