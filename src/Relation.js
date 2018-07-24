"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RelationQueryBuilder_1 = require("./RelationQueryBuilder");
class Relation {
    constructor(edgeName, collectionConstructor) {
        this.edgeName = edgeName;
        this.collectionConstructor = collectionConstructor;
    }
    createQuery(variable) {
        return new RelationQueryBuilder_1.RelationQueryBuilder("u", variable, this.edgeName, new this.collectionConstructor());
    }
}
exports.Relation = Relation;
