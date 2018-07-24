"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryBuilder_1 = require("./QueryBuilder");
class Collection {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    createQuery(variable) {
        return new QueryBuilder_1.QueryBuilder(this, variable);
    }
}
exports.Collection = Collection;
