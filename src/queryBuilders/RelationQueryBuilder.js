"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createProxy_1 = require("../utils/createProxy");
const prettifyQuery_1 = require("../utils/prettifyQuery");
class RelationQueryBuilder {
    constructor(variable, direction, edgeCollection, toCollection) {
        this.variable = variable;
        this.direction = direction;
        this.edgeCollection = edgeCollection;
        this.toCollection = toCollection;
    }
    return(schemaCreator) {
        const toCollectionProxy = createProxy_1.createProxy(this.toCollection, `${this.variable}_v`);
        const edgeCollectionProxy = createProxy_1.createProxy(this.edgeCollection, `${this.variable}_e`);
        const schema = schemaCreator(toCollectionProxy, edgeCollectionProxy);
        return new RelationQuery(this.variable, this.direction, this.edgeCollection._collectionName, schema);
    }
}
exports.RelationQueryBuilder = RelationQueryBuilder;
class RelationQuery {
    constructor(variable, direction, edgeName, schema) {
        this.variable = variable;
        this.direction = direction;
        this.edgeName = edgeName;
        this.schema = schema;
    }
    toAQL(parentVariable, prettyPrint = false) {
        const fields = Object.entries(this.schema).map(([alias, field]) => {
            if (field instanceof RelationQuery) {
                return `${alias}: (\n${field.toAQL(this.variable)}\n)`;
            }
            return `${alias}: ${field}`;
        }).join(",\n");
        const vertexVariable = `${this.variable}_v`;
        const edgeVariable = `${this.variable}_e`;
        const query = `FOR ${vertexVariable}, ${edgeVariable} IN 1 ${this.direction} ${parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;
        return prettyPrint ? prettifyQuery_1.prettifyQuery(query) : query;
    }
}
exports.RelationQuery = RelationQuery;