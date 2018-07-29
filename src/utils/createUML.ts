import { CollectionConstructorType } from "../Collection";
import { Edge } from "../Edge";

// digraph G {
//     "User" -> "Course" [label=teaches, arrowhead=none]
// }
export function createUML(collections: CollectionConstructorType<any>[]) {
    const nodes: string[] = [];
    const edges: string[] = [];
    
    collections.forEach(collectionConstructor => {
        nodes.push(collectionConstructor.name);

        const collection = new collectionConstructor();
        
        Object.entries(collection).forEach(([key, value]) => {
            if(value instanceof Edge) {
                edges.push(`${collectionConstructor.name} -> ${value.edgeCollection.name} [label=${key.toString()}, arrowhead=none]`);
                edges.push(`${value.edgeCollection.name} -> ${value.toCollection.name} [label=${key.toString()}]`);
            }
        });
    });

    return `digraph g {${nodes.join("; ")} ${edges.join("; ")}}`;
}