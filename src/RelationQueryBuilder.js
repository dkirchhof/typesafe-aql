"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class RelationQueryBuilder {
    constructor(variable, edgeName, collection) {
        this.variable = variable;
        this.edgeName = edgeName;
        this.collection = collection;
    }
    return(schemaCreator) {
        const proxy = utils_1.createProxy(this.collection, this.variable);
        const schema = schemaCreator(proxy);
        return new ExecutableRelationQuery(this.edgeName, this.variable, schema);
    }
}
exports.RelationQueryBuilder = RelationQueryBuilder;
class ExecutableRelationQuery {
    constructor(edgeName, variable, schema) {
        this.edgeName = edgeName;
        this.variable = variable;
        this.schema = schema;
    }
    toAQL(parentVariable, prettyPrint = false) {
        const fields = Object.entries(this.schema).map(([alias, field]) => {
            if (field instanceof ExecutableRelationQuery) {
                return `${alias}: (\n${field.toAQL(this.variable)}\n)`;
            }
            return `${alias}: ${field}`;
        }).join(",\n");
        const query = `FOR ${this.variable} IN 1 OUTBOUND ${parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;
        return prettyPrint ? utils_1.prettifyQuery(query) : query;
    }
}
exports.ExecutableRelationQuery = ExecutableRelationQuery;
