"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArangoStore {
    constructor() {
        this.documentCollections = [];
        this.edgeCollections = [];
    }
}
exports.arangoStore = new ArangoStore();
