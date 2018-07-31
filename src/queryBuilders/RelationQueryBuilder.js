"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prettifyQuery_1 = require("../utils/prettifyQuery");
const QueryBuilder_1 = require("./QueryBuilder");
class RelationQueryBuilder extends QueryBuilder_1.QueryBuilder {
    constructor(variable, collection, edgeCollection, direction) {
        super(variable, collection);
        this.edgeCollection = edgeCollection;
        this.direction = direction;
        this.edgeCollectionProxy = this.createProxy(edgeCollection, `${variable}_edge`);
    }
    return(schemaCreator) {
        const schema = schemaCreator(this.collectionProxy, this.edgeCollectionProxy);
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
        const edgeVariable = `${this.variable}_edge`;
        const query = `FOR ${this.variable}, ${edgeVariable} IN 1 ${this.direction} ${parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;
        return prettyPrint ? prettifyQuery_1.prettifyQuery(query) : query;
    }
}
exports.RelationQuery = RelationQuery;
