"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class RelationQueryBuilder {
    constructor(variable, direction, edgeCollection, toCollection) {
        this.variable = variable;
        this.direction = direction;
        this.edgeCollection = edgeCollection;
        this.toCollection = toCollection;
    }
    return(schemaCreator) {
        const toCollectionProxy = utils_1.createProxy(this.toCollection, `${this.variable}_v`);
        const edgeCollectionProxy = utils_1.createProxy(this.edgeCollection, `${this.variable}_e`);
        const schema = schemaCreator(toCollectionProxy, edgeCollectionProxy);
        return new ExecutableRelationQuery(this.variable, this.direction, this.edgeCollection._collectionName, schema);
    }
}
exports.RelationQueryBuilder = RelationQueryBuilder;
class ExecutableRelationQuery {
    constructor(variable, direction, edgeName, schema) {
        this.variable = variable;
        this.direction = direction;
        this.edgeName = edgeName;
        this.schema = schema;
    }
    toAQL(parentVariable, prettyPrint = false) {
        const fields = Object.entries(this.schema).map(([alias, field]) => {
            if (field instanceof ExecutableRelationQuery) {
                return `${alias}: (\n${field.toAQL(this.variable)}\n)`;
            }
            return `${alias}: ${field}`;
        }).join(",\n");
        const vertexVariable = `${this.variable}_v`;
        const edgeVariable = `${this.variable}_e`;
        const query = `FOR ${vertexVariable}, ${edgeVariable} IN 1 ${this.direction} ${parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;
        return prettyPrint ? utils_1.prettifyQuery(query) : query;
    }
}
exports.ExecutableRelationQuery = ExecutableRelationQuery;
