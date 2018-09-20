"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArangoStore {
    constructor() {
        this.collectionDescriptions = new Map();
    }
    getCollection(constructor) {
        return this.collectionDescriptions.get(constructor.name).collection;
    }
    getCollectionDescription(constructor) {
        return this.collectionDescriptions.get(constructor.name);
    }
    getOrRegisterCollectionDescription(constructor) {
        let description = this.getCollectionDescription(constructor);
        if (!description) {
            description = {
                collection: new constructor(),
                collectionName: "",
                fields: [],
            };
            this.collectionDescriptions.set(constructor.name, description);
        }
        return description;
    }
    get allCollections() {
        return [...this.collectionDescriptions.values()].map(d => d.collection);
    }
}
exports.arangoStore = new ArangoStore();
