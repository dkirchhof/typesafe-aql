"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = require("../Store");
function CollectionDescriptor(collectionName) {
    return function (target) {
        Store_1.arangoStore.registerDocumentCollection(target, collectionName);
    };
}
exports.CollectionDescriptor = CollectionDescriptor;
