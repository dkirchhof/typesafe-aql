"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = require("./Query");
class DocumentQuery extends Query_1.Query {
    constructor(collectionName, options) {
        super(options);
        this.collectionName = collectionName;
        this.__type = "documentQuery";
    }
    toAQL(prettyPrint = false) {
        const loop = `FOR ${this.options.variable} IN ${this.collectionName}`;
        return this.queryToAQL(loop, prettyPrint);
    }
    async fetch(db) {
        const query = this.toAQL();
        const result = await db.query(query);
        return result.all();
    }
}
exports.DocumentQuery = DocumentQuery;
