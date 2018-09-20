"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArangoStore {
    constructor() {
        this.collections = new Map();
    }
    getCollection(constructor) {
        return this.collections.get(constructor.name);
    }
    registerDocumentCollection(constructor, collectionName) {
        this.collections.set(constructor.name, new constructor(collectionName));
    }
    get allCollections() {
        return [...this.collections.values()];
    }
}
exports.arangoStore = new ArangoStore();
