"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RelationQueryBuilder_1 = require("../queryBuilders/RelationQueryBuilder");
class Edge {
    constructor(defaultDirection, edgeCollection, toCollection) {
        this.defaultDirection = defaultDirection;
        this.edgeCollection = edgeCollection;
        this.toCollection = toCollection;
    }
    createQuery(variable, direction) {
        return new RelationQueryBuilder_1.RelationQueryBuilder(variable, direction || this.defaultDirection, new this.edgeCollection(), new this.toCollection());
    }
}
exports.Edge = Edge;
