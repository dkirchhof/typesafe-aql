"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../collectionMetadata/Field");
class Collection {
    constructor(_collectionName) {
        this._collectionName = _collectionName;
        this._id = new Field_1.Field();
        this._key = new Field_1.Field();
        this._rev = new Field_1.Field();
    }
}
exports.Collection = Collection;
