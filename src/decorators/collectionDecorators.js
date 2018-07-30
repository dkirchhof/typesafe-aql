"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = require("../Store");
function DocumentCollectionDescriptor(collectionName) {
    return function (target) {
        Store_1.arangoStore.documentCollections.set(target.name, new target(collectionName));
    };
}
exports.DocumentCollectionDescriptor = DocumentCollectionDescriptor;
function EdgeCollectionDescriptor(collectionName) {
    return function (target) {
        Store_1.arangoStore.edgeCollections.set(target.name, new target(collectionName));
    };
}
exports.EdgeCollectionDescriptor = EdgeCollectionDescriptor;
