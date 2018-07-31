"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QueryBuilder_1 = require("./QueryBuilder");
const DocumentQuery_1 = require("./DocumentQuery");
class DocumentQueryBuilder extends QueryBuilder_1.QueryBuilder {
    return(schemaCreator) {
        const schema = schemaCreator(this.collectionProxy);
        return new DocumentQuery_1.DocumentQuery(this.collection._collectionName, this.variable, this.filters, this.limitTo, schema);
    }
}
exports.DocumentQueryBuilder = DocumentQueryBuilder;
