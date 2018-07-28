import { EdgeCollection } from "./EdgeCollection";
import { RelationQueryBuilder } from "./RelationQueryBuilder";
import { RelationDirection } from "./RelationDirection";
import { Collection } from "./Collection";

export class Edge<EdgeCollectionType extends EdgeCollection, ToCollectionType extends Collection> {
    constructor(
        private readonly defaultDirection: RelationDirection,
        // private readonly edgeName: string, 
        // private readonly collectionConstructor: { new(...args: any[]): CollectionType }
        private readonly edgeCollection: EdgeCollectionType,
        private readonly toCollection: ToCollectionType,
    ) {

    }

    createQuery(variable: string, direction?: RelationDirection) {
        return new RelationQueryBuilder(
            variable,
            direction || this.defaultDirection, 
            this.edgeCollection,
            this.toCollection,
        );
    }
}