import { Collection, EdgeCollection } from "../../collections";
import { EdgeDirection } from "../../collectionMetadata";
import { RelationQuery } from "../";
import { QueryBuilder } from ".";

export class RelationQueryBuilder<EdgeCollectionType extends EdgeCollection<any>, ToCollectionType extends Collection<any>> extends QueryBuilder<ToCollectionType> {
    private readonly edgeCollectionProxy: EdgeCollectionType;

    constructor(
        variable: string,
        collection: ToCollectionType,
        private readonly edgeCollection: EdgeCollectionType,
        private readonly direction: EdgeDirection
    ) {
        super(variable, collection);
        this.edgeCollectionProxy = this.createProxy(edgeCollection, `${variable}_edge`);
    }

    return <Schema extends object>(schemaCreator: (collection: ToCollectionType, edge?: EdgeCollectionType) => Schema) {
        this.options.schema = schemaCreator(this.collectionProxy, this.edgeCollectionProxy);

        return new RelationQuery<Schema>(this.direction, this.edgeCollection._collectionName, this.options);
    }
}
