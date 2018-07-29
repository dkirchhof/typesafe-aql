import { EdgeCollection } from "./EdgeCollection";
import { RelationQueryBuilder } from "./RelationQueryBuilder";
import { RelationDirection } from "./RelationDirection";
import { Collection, CollectionConstructorType } from "./Collection";

export class Edge<EdgeCollectionType extends EdgeCollection, ToCollectionType extends Collection> {
    constructor(
        public readonly defaultDirection: RelationDirection,
        public readonly edgeCollection: CollectionConstructorType<EdgeCollectionType>,
        public readonly toCollection: CollectionConstructorType<ToCollectionType>,
    ) {

    }

    createQuery(variable: string, direction?: RelationDirection) {
        return new RelationQueryBuilder(
            variable,
            direction || this.defaultDirection, 
            new this.edgeCollection(),
            new this.toCollection(),
        );
    }
}