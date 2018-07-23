// import { Database } from "arangojs";

// const dbServer = new Database();
// const db = dbServer.useDatabase("test");

// FOR x IN y
// return {
//   fistname: x.firstname,
//   lastname: x.lastname,
//   age: x.age,
//   courses: subquery
// }

// FOR x IN 1 OUTBOUND y z
// FOR x IN 1 INBOUND y z
// FOR x IN 1 ANY y z

type MappedSchema<T> = { 
    [s in keyof T]: T[s] extends ExecutableRelationQuery<infer U> ? U : T[s];
};

class Relation<Model extends object> {
    resolve(tableName: string, variable: string) {
        return new QueryBuilder<Model>(tableName, variable);
    }
}

interface IUser {
    firstname: string;
    lastname: string;
    age: number;

    // relations: {
    //     courses: ICourse;
    // }

    // ccourses: Relation<ICourse>;
}

class Field<Type> {

}

type Entity<Type> = { [s in keyof Type]: Field<Type[s]>; };

class User {
    firstname = new Field<string>();
    lastname = new Field<string>();
    age = new Field<number>();
}

interface ICourse {
    name: string;
}

class QueryBuilder<Model extends object> {

    constructor(
        private readonly tableName: string,
        private readonly variable: string) {

    }

    return<Schema>(schemaCreator: (m: Model) => Schema) {
        
        const empty = { } as Model;

        const proxy = new Proxy(empty, {
            get: (_, key) => `${this.variable}.${key.toString()}`
        });

        const schema = schemaCreator(proxy);

        return new ExecutableQuery<Schema>(this.tableName, this.variable, schema);
    }
}

class ExecutableQuery<Schema> {
    
    constructor(
        private readonly tableName: string,
        private readonly variable: string,
        private readonly schema: Schema) {

    }

    toAQL() {
        const fields = Object.entries(this.schema).map(([alias, fieldName]) => {
            
            if(fieldName instanceof ExecutableRelationQuery) {
                return `${alias}: (\n${fieldName.toAQL()}\n)`;
            }

            return `${alias}: ${fieldName}`;

        }).join(",\n");

        return `FOR ${this.variable} IN ${this.tableName}\nRETURN {\n${fields}\n}`;
    }
    
    fetch() {
        // const result = await db.query(query);
        // return result.all() as Schema[];

        // return { } as Schema[];

        return { } as MappedSchema<Schema>;
    }
}

class RelationQueryBuilder<Model extends object> {

    private readonly edgeName = "teaches";
    private readonly variable = "t";

    constructor(private readonly parentVariable: string, type: Model) {

    }

    return <Schema>(schemaCreator: (m: Model) => Schema) {
        const empty: any = { };

        const proxy = new Proxy(empty, {
            get: (target, key) => {
                if(key === "courses") {
                    return target[key];
                }

                return `${this.variable}.${key.toString()}`;
            }
        });

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

    toAQL() {

        const fields = Object.entries(this.schema).map(([alias, fieldName]) => {
            
            if(fieldName instanceof RelationQueryBuilder) {

            }

            return `${alias}: ${fieldName}`;

        }).join(",\n");

        // FOR x IN 1 OUTBOUND y z
        return `FOR ${this.variable} IN 1 OUTBOUND ${this.parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;
    }

    fetch() {
        return {} as Schema;
    }
}

(async () => {

    console.log(
        prettyPrint(
            new QueryBuilder<IUser>("users", "u")
                .return(u => ({ 
                    firstname: u.firstname, 
                    age: u.age,
                    test: 1,

                    courses: new RelationQueryBuilder("u", u.relations.courses)
                        .return(c => ({ name: c.name })),
                }))
                .toAQL()    
        )
    );

})();

// type Diff<T, U> = T extends U ? never : T;
// // type NonNullable<T> = Diff<T, null | undefined>;

// function f<Model>(schema: { [s in keyof Model]?: boolean }) {
//     // return {} as Pick<Model, Extract<keyof Model, keyof typeof schema>>;
//     // return {} as Pick<Model, NonNullable<keyof typeof schema>>;

//     return {} as Model;
// }

// f<IUser>({ age: true, lastname: true }).



function prettyPrint(query: string, spaces = 2) {
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