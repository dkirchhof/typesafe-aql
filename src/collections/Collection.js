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
    async getOne(db, key) {
        try {
            const result = await db.collection(this._collectionName).document(key);
            return result;
        }
        catch (e) {
            if (e.code === 404) {
                return null;
            }
            throw e;
        }
    }
    async getMany(db, keys) {
        return db.collection(this._collectionName).lookupByKeys(keys);
    }
    async getAll(db) {
        const result = await db.collection(this._collectionName).all();
        return result.all();
    }
}
exports.Collection = Collection;
