"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("./Collection");
const Store_1 = require("../Store");
class DocumentCollection extends Collection_1.Collection {
    constructor(_collectionName) {
        super(_collectionName);
        Store_1.arangoStore.documentCollections.push(this);
    }
}
exports.DocumentCollection = DocumentCollection;
