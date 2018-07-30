import { CollectionConstructorType } from "../collections/Collection";
import { DocumentCollection } from "../collections/DocumentCollection";
import { EdgeCollection } from "../collections/EdgeCollection";
import { RelationQueryBuilder } from "../queryBuilders/RelationQueryBuilder";
import { arangoStore } from "../Store";

export type EdgeDirection = "INBOUND" | "OUTBOUND" | "ANY"; 

export class Edge<EdgeCollectionType extends EdgeCollection, ToCollectionType extends DocumentCollection> {
    constructor(
        private readonly defaultDirection: EdgeDirection,
        private readonly getEdgeCollectionClass: () => CollectionConstructorType<EdgeCollectionType>,
        private readonly getToCollectionClass: () => CollectionConstructorType<ToCollectionType>,
    ) {

    }

    public get edgeCollection() {
        return arangoStore.getEdgeCollection(this.getEdgeCollectionClass());
    }

    public get toCollection() {
        return arangoStore.getDocumentCollection(this.getToCollectionClass());
    }

    createQuery(variable: string, direction?: EdgeDirection) {
        return new RelationQueryBuilder(
            variable,
            direction || this.defaultDirection, 
            this.edgeCollection,
            this.toCollection,
        );
    }
}