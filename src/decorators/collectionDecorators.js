"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = require("../Store");
function CollectionDescriptor(collectionName) {
    return function (target) {
        const description = Store_1.arangoStore.getOrRegisterCollectionDescription(target);
        description.collectionName = collectionName;
        if (target.name !== "Collection") {
            addParentFields(description, target);
        }
    };
}
exports.CollectionDescriptor = CollectionDescriptor;
function addParentFields(description, target) {
    const parent = Object.getPrototypeOf(target);
    if (parent) {
        const parentDescription = Store_1.arangoStore.getCollectionDescription(parent);
        if (parentDescription) {
            description.fields.push(...parentDescription.fields);
        }
    }
    if (parent.name !== "Collection") {
        addParentFields(description, parent);
    }
}
