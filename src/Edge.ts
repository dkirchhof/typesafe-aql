import { EdgeCollection } from "./EdgeCollection";
import { RelationQueryBuilder } from "./RelationQueryBuilder";
import { RelationDirection } from "./RelationDirection";
import { Collection } from "./Collection";

type ConstructorType<Type extends Collection> = { new(...args: any[]): Type };

export class Edge<EdgeCollectionType extends EdgeCollection, ToCollectionType extends Collection> {
    constructor(
        private readonly defaultDirection: RelationDirection,
        // private readonly edgeName: string, 
        // private readonly collectionConstructor: { new(...args: any[]): CollectionType }
        private readonly edgeCollection: ConstructorType<EdgeCollectionType>,
        private readonly toCollection: ConstructorType<ToCollectionType>,
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