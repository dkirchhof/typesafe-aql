"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collectionMetadata_1 = require("../collectionMetadata");
const _1 = require(".");
class EdgeCollection extends _1.Collection {
    constructor() {
        super(...arguments);
        this._from = new collectionMetadata_1.Field();
        this._to = new collectionMetadata_1.Field();
    }
}
exports.EdgeCollection = EdgeCollection;
