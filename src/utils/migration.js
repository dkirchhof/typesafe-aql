"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentCollection_1 = require("../collections/DocumentCollection");
const EdgeCollection_1 = require("../collections/EdgeCollection");
async function getMissingCollections(db, localCollections) {
    const remoteCollections = await db.listCollections();
    const remoteCollectioNames = remoteCollections.map(collection => collection.name);
    return localCollections.filter(collection => !remoteCollectioNames.includes(collection._collectionName));
}
exports.getMissingCollections = getMissingCollections;
async function createMissingCollections(db, localCollections) {
    Promise.all(localCollections.map(collection => {
        if (collection instanceof DocumentCollection_1.DocumentCollection) {
            return db.collection(collection._collectionName).create();
        }
        else if (collection instanceof EdgeCollection_1.EdgeCollection) {
            return db.edgeCollection(collection._collectionName).create();
        }
    }));
}
exports.createMissingCollections = createMissingCollections;
