"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("./Collection");
const Field_1 = require("../collectionMetadata/Field");
const Store_1 = require("../Store");
class EdgeCollection extends Collection_1.Collection {
    constructor(_collectionName) {
        super(_collectionName);
        this._from = new Field_1.Field();
        this._to = new Field_1.Field();
        Store_1.arangoStore.edgeCollections.push(this);
    }
}
exports.EdgeCollection = EdgeCollection;
