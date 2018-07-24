"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class RelationQueryBuilder {
    constructor(parentVariable, variable, edgeName, collection) {
        this.parentVariable = parentVariable;
        this.variable = variable;
        this.edgeName = edgeName;
        this.collection = collection;
    }
    return(schemaCreator) {
        const proxy = utils_1.createProxy(this.collection, this.variable);
        const schema = schemaCreator(proxy);
        return new ExecutableRelationQuery(this.parentVariable, this.edgeName, this.variable, schema);
    }
}
exports.RelationQueryBuilder = RelationQueryBuilder;
class ExecutableRelationQuery {
    constructor(parentVariable, edgeName, variable, schema) {
        this.parentVariable = parentVariable;
        this.edgeName = edgeName;
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
        const query = `FOR ${this.variable} IN 1 OUTBOUND ${this.parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;
        return prettyPrint ? utils_1.prettifyQuery(query) : query;
    }
    fetch() {
        return {};
    }
}
exports.ExecutableRelationQuery = ExecutableRelationQuery;
