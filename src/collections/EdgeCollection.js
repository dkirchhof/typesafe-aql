"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("./Collection");
const Field_1 = require("../collectionMetadata/Field");
class EdgeCollection extends Collection_1.Collection {
    constructor() {
        super(...arguments);
        this._from = new Field_1.Field();
        this._to = new Field_1.Field();
    }
}
exports.EdgeCollection = EdgeCollection;
