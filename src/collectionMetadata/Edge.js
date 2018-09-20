"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("../queries/builders");
const Store_1 = require("../Store");
class Edge {
    constructor(defaultDirection, getEdgeCollectionClass, getToCollectionClass) {
        this.defaultDirection = defaultDirection;
        this.getEdgeCollectionClass = getEdgeCollectionClass;
        this.getToCollectionClass = getToCollectionClass;
    }
    get edgeCollection() {
        return Store_1.arangoStore.getCollection(this.getEdgeCollectionClass());
    }
    get toCollection() {
        return Store_1.arangoStore.getCollection(this.getToCollectionClass());
    }
    createQuery(variable, direction) {
        return new builders_1.RelationQueryBuilder(variable, this.toCollection, this.edgeCollection, direction || this.defaultDirection);
    }
}
exports.Edge = Edge;
