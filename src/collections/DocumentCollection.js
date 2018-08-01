"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("./Collection");
const DocumentQueryBuilder_1 = require("../queryBuilders/DocumentQueryBuilder");
class DocumentCollection extends Collection_1.Collection {
    createQuery(variable) {
        return new DocumentQueryBuilder_1.DocumentQueryBuilder(variable, this);
    }
    async getOne(db, id) {
        try {
            const result = await db.collection(this._collectionName).document(id);
            return result;
        }
        catch (e) {
            if (e.code === 404) {
                return null;
            }
            throw e;
        }
    }
}
exports.DocumentCollection = DocumentCollection;
