"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RelationQueryBuilder_1 = require("./RelationQueryBuilder");
class Edge {
    constructor(defaultDirection, 
    // private readonly edgeName: string, 
    // private readonly collectionConstructor: { new(...args: any[]): CollectionType }
    edgeCollection, toCollection) {
        this.defaultDirection = defaultDirection;
        this.edgeCollection = edgeCollection;
        this.toCollection = toCollection;
    }
    createQuery(variable, direction) {
        return new RelationQueryBuilder_1.RelationQueryBuilder(variable, direction || this.defaultDirection, this.edgeCollection, this.toCollection);
    }
}
exports.Edge = Edge;
