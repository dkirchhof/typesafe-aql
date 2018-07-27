import { EdgeCollection } from "./EdgeCollection";
import { RelationQueryBuilder } from "./RelationQueryBuilder";
import { RelationDirection } from "./RelationDirection";

export class Edge {
    constructor(
        private readonly defaultDirection: RelationDirection,
        // private readonly edgeName: string, 
        // private readonly collectionConstructor: { new(...args: any[]): CollectionType }
        private readonly edgeCollection: EdgeCollection<any, any>) {

    }

    createQuery(variable: string, direction?: RelationDirection) {
        return new RelationQueryBuilder(
            variable,
            direction || this.defaultDirection, 
            this.edgeCollection);
    }
}