"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RelationQueryBuilder_1 = require("./RelationQueryBuilder");
class Relation {
    constructor(direction, edgeName, collectionConstructor) {
        this.direction = direction;
        this.edgeName = edgeName;
        this.collectionConstructor = collectionConstructor;
    }
    createQuery(variable, direction) {
        return new RelationQueryBuilder_1.RelationQueryBuilder(variable, direction || this.direction, this.edgeName, new this.collectionConstructor());
    }
}
exports.Relation = Relation;
