import { DocumentCollection } from "../collections/DocumentCollection";
import { EdgeCollection } from "../collections/EdgeCollection";
import { EdgeDirection } from "../collectionMetadata/Edge";
import { QueryBuilder } from "./QueryBuilder";
import { RelationQuery } from "./RelationQuery";

export class RelationQueryBuilder<EdgeCollectionType extends EdgeCollection, ToCollectionType extends DocumentCollection> extends QueryBuilder<ToCollectionType> {
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

    return <Schema>(schemaCreator: (collection: ToCollectionType, edge?: EdgeCollectionType) => Schema) {
        const schema = schemaCreator(this.collectionProxy, this.edgeCollectionProxy);

        return new RelationQuery<Schema>(this.direction, this.edgeCollection._collectionName, this.variable, this.filters, schema);
    }
}
