"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collectionMetadata_1 = require("../collectionMetadata");
const builders_1 = require("../queries/builders");
class Collection {
    constructor(_collectionName) {
        this._collectionName = _collectionName;
        this._id = new collectionMetadata_1.Field();
        this._key = new collectionMetadata_1.Field();
        this._rev = new collectionMetadata_1.Field();
    }
    createQuery(variable) {
        return new builders_1.DocumentQueryBuilder(variable, this);
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
