"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RelationQueryBuilder_1 = require("./RelationQueryBuilder");
class Edge {
    constructor(direction, 
    // private readonly edgeName: string, 
    // private readonly collectionConstructor: { new(...args: any[]): CollectionType }
    edgeCollection) {
        this.direction = direction;
        this.edgeCollection = edgeCollection;
    }
    createQuery(variable, direction) {
        return new RelationQueryBuilder_1.RelationQueryBuilder(variable, direction || this.direction, this.edgeCollection.collectionName);
    }
}
exports.Edge = Edge;
