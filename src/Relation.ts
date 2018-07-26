import { Collection } from "./Collection";
import { RelationQueryBuilder } from "./RelationQueryBuilder";
import { RelationDirection } from "./RelationDirection";

export class Relation<CollectionType extends Collection> {
    constructor(
        private readonly direction: RelationDirection,
        private readonly edgeName: string, 
        private readonly collectionConstructor: { new(...args: any[]): CollectionType }) {

    }

    createQuery(variable: string, direction?: RelationDirection) {
        return new RelationQueryBuilder(
            variable,
            direction || this.direction, 
            this.edgeName, 
            new this.collectionConstructor());
    }
}