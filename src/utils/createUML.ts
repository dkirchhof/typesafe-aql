import { Collection } from "../collections/Collection";
import { Edge } from "../collectionMetadata/Edge";

// digraph G {
//     "User" -> "Course" [label=teaches, arrowhead=none]
// }
export function createUML(collections: Collection[]) {
    const nodes: string[] = [];
    const edges: string[] = [];
    
    collections.forEach(collection => {
        const className = collection.constructor.name;
        nodes.push(className);
        
        Object.entries(collection).forEach(([key, value]) => {
            if(value instanceof Edge) {
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