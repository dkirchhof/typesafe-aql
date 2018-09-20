"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const _1 = require(".");
class RelationQueryBuilder extends _1.QueryBuilder {
    constructor(variable, collection, edgeCollection, direction) {
        super(variable, collection);
        this.edgeCollection = edgeCollection;
        this.direction = direction;
        this.edgeCollectionProxy = this.createProxy(edgeCollection, `${variable}_edge`);
    }
    return(schemaCreator) {
        this.options.schema = schemaCreator(this.collectionProxy, this.edgeCollectionProxy);
        return new __1.RelationQuery(this.direction, this.edgeCollection._collectionName, this.options);
    }
}
exports.RelationQueryBuilder = RelationQueryBuilder;
