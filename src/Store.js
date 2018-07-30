"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArangoStore {
    constructor() {
        this.documentCollections = new Map();
        this.edgeCollections = new Map();
    }
}
exports.arangoStore = new ArangoStore();
