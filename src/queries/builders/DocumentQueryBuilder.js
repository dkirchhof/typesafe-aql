"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const _1 = require(".");
class DocumentQueryBuilder extends _1.QueryBuilder {
    return(schemaCreator) {
        this.options.schema = schemaCreator(this.collectionProxy);
        return new __1.DocumentQuery(this.collection._collectionName, this.options);
    }
    returnAll() {
        return new __1.DocumentQuery(this.collection._collectionName, this.options);
    }
}
exports.DocumentQueryBuilder = DocumentQueryBuilder;
