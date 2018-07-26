"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const RelationQueryBuilder_1 = require("./RelationQueryBuilder");
class QueryBuilder {
    constructor(collection, variable) {
        this.collection = collection;
        this.variable = variable;
    }
    return(schemaCreator) {
        const proxy = utils_1.createProxy(this.collection, this.variable);
        const schema = schemaCreator(proxy);
        return new ExecutableQuery(this.collection.collectionName, this.variable, schema);
    }
}
exports.QueryBuilder = QueryBuilder;
class ExecutableQuery {
    constructor(collectionName, variable, schema) {
        this.collectionName = collectionName;
        this.variable = variable;
        this.schema = schema;
    }
    toAQL(prettyPrint = false) {
        const fields = Object.entries(this.schema).map(([alias, field]) => {
            if (field instanceof RelationQueryBuilder_1.ExecutableRelationQuery) {
                return `${alias}: (\n${field.toAQL(this.variable)}\n)`;
            }
            return `${alias}: ${field}`;
        }).join(",\n");
        const query = `FOR ${this.variable} IN ${this.collectionName}\nRETURN {\n${fields}\n}`;
        return prettyPrint ? utils_1.prettifyQuery(query) : query;
    }
    async fetch(db) {
        // return { } as MappedSchema<Schema>;
        const query = this.toAQL();
        const result = await db.query(query);
        return result.all();
    }
}
exports.ExecutableQuery = ExecutableQuery;
