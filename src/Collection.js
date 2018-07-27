"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
const QueryBuilder_1 = require("./QueryBuilder");
class Collection {
    constructor(collectionName) {
        this.collectionName = collectionName;
        this._id = new Field_1.Field();
        this._key = new Field_1.Field();
        this._rev = new Field_1.Field();
    }
    createQuery(variable) {
        return new QueryBuilder_1.QueryBuilder(this, variable);
    }
}
exports.Collection = Collection;
