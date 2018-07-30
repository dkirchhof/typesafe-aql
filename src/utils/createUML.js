"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Edge_1 = require("../collectionMetadata/Edge");
// digraph G {
//     "User" -> "Course" [label=teaches, arrowhead=none]
// }
function createUML(collections) {
    const nodes = [];
    const edges = [];
    collections.forEach(collectionConstructor => {
        nodes.push(collectionConstructor.name);
        const collection = new collectionConstructor();
        Object.entries(collection).forEach(([key, value]) => {
            if (value instanceof Edge_1.Edge) {
                edges.push(`${collectionConstructor.name} -> ${value.edgeCollection.name} [label=${key.toString()}, arrowhead=none]`);
                edges.push(`${value.edgeCollection.name} -> ${value.toCollection.name} [label=${key.toString()}]`);
            }
        });
    });
    return `digraph g {${nodes.join("; ")} ${edges.join("; ")}}`;
}
exports.createUML = createUML;
