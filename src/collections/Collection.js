"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../collectionMetadata/Field");
const DocumentQueryBuilder_1 = require("../queryBuilders/DocumentQueryBuilder");
class Collection {
    constructor(_collectionName) {
        this._collectionName = _collectionName;
        this._id = new Field_1.Field();
        this._key = new Field_1.Field();
        this._rev = new Field_1.Field();
    }
    createQuery(variable) {
        return new DocumentQueryBuilder_1.DocumentQueryBuilder(variable, this);
    }
}
exports.Collection = Collection;
