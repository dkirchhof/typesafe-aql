import { Collection, CollectionConstructorType } from "../collections/Collection";
import { EdgeCollection } from "../collections/EdgeCollection";
import { RelationQueryBuilder } from "../queryBuilders/RelationQueryBuilder";
import { arangoStore } from "../Store";

export type EdgeDirection = "INBOUND" | "OUTBOUND" | "ANY"; 

export class Edge<EdgeCollectionType extends EdgeCollection<any>, ToCollectionType extends Collection<any>> {
    constructor(
        private readonly defaultDirection: EdgeDirection,
        private readonly getEdgeCollectionClass: () => CollectionConstructorType<EdgeCollectionType>,
        private readonly getToCollectionClass: () => CollectionConstructorType<ToCollectionType>,
    ) { }

    public get edgeCollection() {
        return arangoStore.getCollection(this.getEdgeCollectionClass());
    }

    public get toCollection() {
        return arangoStore.getCollection(this.getToCollectionClass());
    }

    createQuery(variable: string, direction?: EdgeDirection) {
        return new RelationQueryBuilder(
            variable,
            this.toCollection,
            this.edgeCollection,
            direction || this.defaultDirection, 
        );
    }
}