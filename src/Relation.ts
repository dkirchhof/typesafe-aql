import { Collection } from "./Collection";
import { RelationQueryBuilder } from "./RelationQueryBuilder";

export class Relation<CollectionType extends Collection> {
    constructor(
        private readonly edgeName: string, 
        private readonly collectionConstructor: { new(...args: any[]): CollectionType }) {

    }

    createQuery(variable: string) {
        return new RelationQueryBuilder(variable, this.edgeName, new this.collectionConstructor());
    }
}