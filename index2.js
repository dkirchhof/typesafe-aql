"use strict";
// import { Database } from "arangojs";
class Field {
    constructor() {
        this.__type = "field";
    }
}
class Relation {
    constructor(edgeName, collectionConstructor) {
        this.edgeName = edgeName;
        this.collectionConstructor = collectionConstructor;
    }
    createQuery(variable) {
        return new RelationQueryBuilder("u", variable, this.edgeName, new this.collectionConstructor());
    }
}
// type Entity<Type> = { [s in keyof Type]: Field<Type[s]>; };
class Collection {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    createQuery(variable) {
        return new QueryBuilder(this, variable);
    }
}
class UserCollection extends Collection {
    constructor(name) {
        super(name);
        this.firstname = new Field();
        this.lastname = new Field();
        this.age = new Field();
        this.courses = new Relation("teaches", CourseCollection);
    }
}
class CourseCollection extends Collection {
    constructor() {
        super(...arguments);
        this.name = new Field();
    }
}
const userCollection = new UserCollection("users");
const courseCollection = new CourseCollection("courses");
class QueryBuilder {
    constructor(collection, variable) {
        this.collection = collection;
        this.variable = variable;
    }
    return(schemaCreator) {
        const proxy = createProxy(this.collection, this.variable);
        const schema = schemaCreator(proxy);
        return new ExecutableQuery(this.collection.collectionName, this.variable, schema);
    }
}
class ExecutableQuery {
    constructor(collectionName, variable, schema) {
        this.collectionName = collectionName;
        this.variable = variable;
        this.schema = schema;
    }
    toAQL(prettyPrint = false) {
        const fields = Object.entries(this.schema).map(([alias, field]) => {
            if (field instanceof ExecutableRelationQuery) {
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
        return {};
    }
}
class RelationQueryBuilder {
    constructor(parentVariable, variable, edgeName, collection) {
        this.parentVariable = parentVariable;
        this.variable = variable;
        this.edgeName = edgeName;
        this.collection = collection;
    }
    return(schemaCreator) {
        const proxy = createProxy(this.collection, this.variable);
        const schema = schemaCreator(proxy);
        return new ExecutableRelationQuery(this.parentVariable, this.edgeName, this.variable, schema);
    }
}
class ExecutableRelationQuery {
    constructor(parentVariable, edgeName, variable, schema) {
        this.parentVariable = parentVariable;
        this.edgeName = edgeName;
        this.variable = variable;
        this.schema = schema;
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
        return {};
    }
}
(async () => {
    // userCollection.createQuery("u").return(u => ({ firstname: u.firstname, lastname: u.lastname, age: u.age })).toAQL(),
    console.log(userCollection.createQuery("u")
        .return(u => ({
        // firstname: u.firstname,
        lastname: u.lastname,
        age: u.age,
        courses: u.courses.createQuery("c")
            .return(c => ({ name: u.firstname })),
    }))
        .toAQL(true));
})();
function createProxy(collection, variable) {
    return new Proxy(collection, {
        get: (target, key) => {
            if (target[key] instanceof Field) {
                return `${variable}.${key.toString()}`;
            }
            return target[key];
        }
    });
}
function prettifyQuery(query, spaces = 2) {
    let indentation = 0;
    return query
        .split("\n")
        .map(line => {
        if (line.endsWith("}") || line.endsWith(")")) {
            indentation--;
        }
        const indentedLine = `${" ".repeat(indentation * spaces)}${line}`;
        if (line.endsWith("{") || line.endsWith("(")) {
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
