import { CollectionConstructorType } from "../collections/Collection";
import { DocumentCollection } from "../collections/DocumentCollection";
import { EdgeCollection } from "../collections/EdgeCollection";
import { RelationQueryBuilder } from "../queryBuilders/RelationQueryBuilder";

export type EdgeDirection = "INBOUND" | "OUTBOUND" | "ANY"; 

export class Edge<EdgeCollectionType extends EdgeCollection, ToCollectionType extends DocumentCollection> {
    constructor(
        public readonly defaultDirection: EdgeDirection,
        public readonly edgeCollection: CollectionConstructorType<EdgeCollectionType>,
        public readonly toCollection: CollectionConstructorType<ToCollectionType>,
    ) {

    }

    createQuery(variable: string, direction?: EdgeDirection) {
        return new RelationQueryBuilder(
            variable,
            direction || this.defaultDirection, 
            new this.edgeCollection(),
            new this.toCollection(),
        );
    }
}