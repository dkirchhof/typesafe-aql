"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArangoStore {
    constructor() {
        this.documentCollections = new Map();
        this.edgeCollections = new Map();
    }
    getDocumentCollection(constructor) {
        return this.documentCollections.get(constructor.name);
    }
    getEdgeCollection(constructor) {
        return this.edgeCollections.get(constructor.name);
    }
    registerDocumentCollection(constructor, collectionName) {
        this.documentCollections.set(constructor.name, new constructor(collectionName));
    }
    registerEdgeCollection(constructor, collectionName) {
        this.edgeCollections.set(constructor.name, new constructor(collectionName));
    }
    get allCollections() {
        return [
            ...this.documentCollections.values(),
            ...this.edgeCollections.values(),
        ];
    }
}
exports.arangoStore = new ArangoStore();
