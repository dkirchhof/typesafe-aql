"use strict";
// import { Database } from "arangojs";
class Relation {
    resolve(tableName, variable) {
        return new QueryBuilder(tableName, variable);
    }
}
class QueryBuilder {
    constructor(tableName, variable) {
        this.tableName = tableName;
        this.variable = variable;
    }
    return(schemaCreator) {
        const empty = {};
        const proxy = new Proxy(empty, {
            get: (_, key) => `${this.variable}.${key.toString()}`
        });
        const schema = schemaCreator(proxy);
        return new ExecutableQuery(this.tableName, this.variable, schema);
    }
}
class ExecutableQuery {
    constructor(tableName, variable, schema) {
        this.tableName = tableName;
        this.variable = variable;
        this.schema = schema;
    }
    toAQL() {
        const fields = Object.entries(this.schema).map(([alias, fieldName]) => {
            if (fieldName instanceof ExecutableRelationQuery) {
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
        return {};
    }
}
class RelationQueryBuilder {
    constructor(parentVariable, type) {
        this.parentVariable = parentVariable;
        this.edgeName = "teaches";
        this.variable = "t";
    }
    return(schemaCreator) {
        const empty = {};
        const proxy = new Proxy(empty, {
            get: (target, key) => {
                if (key === "courses") {
                    return target[key];
                }
                return `${this.variable}.${key.toString()}`;
            }
        });
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
    toAQL() {
        const fields = Object.entries(this.schema).map(([alias, fieldName]) => {
            if (fieldName instanceof RelationQueryBuilder) {
            }
            return `${alias}: ${fieldName}`;
        }).join(",\n");
        // FOR x IN 1 OUTBOUND y z
        return `FOR ${this.variable} IN 1 OUTBOUND ${this.parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;
    }
    fetch() {
        return {};
    }
}
(async () => {
    console.log(prettyPrint(new QueryBuilder("users", "u")
        .return(u => ({
        firstname: u.firstname,
        age: u.age,
        test: 1,
        courses: new RelationQueryBuilder("u", u.relations.courses)
            .return(c => ({ name: c.name })),
        ccourses: u.ccourses.resolve("courses", "c").return(c => ({ name: c.name }))
    }))
        .toAQL()));
})();
// type Diff<T, U> = T extends U ? never : T;
// // type NonNullable<T> = Diff<T, null | undefined>;
// function f<Model>(schema: { [s in keyof Model]?: boolean }) {
//     // return {} as Pick<Model, Extract<keyof Model, keyof typeof schema>>;
//     // return {} as Pick<Model, NonNullable<keyof typeof schema>>;
//     return {} as Model;
// }
// f<IUser>({ age: true, lastname: true }).
function prettyPrint(query, spaces = 2) {
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
