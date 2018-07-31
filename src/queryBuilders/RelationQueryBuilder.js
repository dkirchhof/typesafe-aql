"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryBuilder_1 = require("./QueryBuilder");
const RelationQuery_1 = require("./RelationQuery");
class RelationQueryBuilder extends QueryBuilder_1.QueryBuilder {
    constructor(variable, collection, edgeCollection, direction) {
        super(variable, collection);
        this.edgeCollection = edgeCollection;
        this.direction = direction;
        this.edgeCollectionProxy = this.createProxy(edgeCollection, `${variable}_edge`);
    }
    return(schemaCreator) {
        this.options.schema = schemaCreator(this.collectionProxy, this.edgeCollectionProxy);
        return new RelationQuery_1.RelationQuery(this.direction, this.edgeCollection._collectionName, this.options);
    }
}
exports.RelationQueryBuilder = RelationQueryBuilder;
