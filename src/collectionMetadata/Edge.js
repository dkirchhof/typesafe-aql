"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RelationQueryBuilder_1 = require("../queryBuilders/RelationQueryBuilder");
const Store_1 = require("../Store");
class Edge {
    constructor(defaultDirection, getEdgeCollectionClass, getToCollectionClass) {
        this.defaultDirection = defaultDirection;
        this.getEdgeCollectionClass = getEdgeCollectionClass;
        this.getToCollectionClass = getToCollectionClass;
    }
    get edgeCollection() {
        return Store_1.arangoStore.getEdgeCollection(this.getEdgeCollectionClass());
    }
    get toCollection() {
        return Store_1.arangoStore.getDocumentCollection(this.getToCollectionClass());
    }
    createQuery(variable, direction) {
        return new RelationQueryBuilder_1.RelationQueryBuilder(variable, this.toCollection, this.edgeCollection, direction || this.defaultDirection);
    }
}
exports.Edge = Edge;
