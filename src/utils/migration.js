"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("../collections");
async function getMissingCollections(db, localCollections) {
    const remoteCollections = await db.listCollections();
    const remoteCollectioNames = remoteCollections.map(collection => collection.name);
    return localCollections.filter(collection => !remoteCollectioNames.includes(collection._collectionName));
}
exports.getMissingCollections = getMissingCollections;
async function createMissingCollections(db, localCollections) {
    Promise.all(localCollections.map(collection => {
        if (collection instanceof collections_1.EdgeCollection) {
            return db.edgeCollection(collection._collectionName).create();
        }
        return db.collection(collection._collectionName).create();
    }));
}
exports.createMissingCollections = createMissingCollections;
