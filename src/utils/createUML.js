"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collectionMetadata_1 = require("../collectionMetadata");
// digraph G {
//     "User" -> "Course" [label=teaches, arrowhead=none]
// }
function createUML(collections) {
    const nodes = [];
    const edges = [];
    collections.forEach(collection => {
        const className = collection.constructor.name;
        nodes.push(className);
        Object.entries(collection).forEach(([key, value]) => {
            if (value instanceof collectionMetadata_1.Edge) {
                const edgeName = key.toString();
                const edgeCollectionClassName = value.edgeCollection.constructor.name;
                const toCollectionClassName = value.toCollection.constructor.name;
                edges.push(`${className} -> ${edgeCollectionClassName} [label=${edgeName}, arrowhead=none]`);
                edges.push(`${edgeCollectionClassName} -> ${toCollectionClassName} [label=${edgeName}]`);
            }
        });
    });
    return `digraph g {${nodes.join("; ")} ${edges.join("; ")}}`;
}
exports.createUML = createUML;
