import { Collection } from "../collections/Collection";
import { QueryBuilder } from "./QueryBuilder";
import { DocumentQuery } from "./DocumentQuery";

export class DocumentQueryBuilder<CollectionType extends Collection> extends QueryBuilder<CollectionType> {

    return<Schema>(schemaCreator: (collection: CollectionType) => Schema) {
        const schema = schemaCreator(this.collectionProxy);

        return new DocumentQuery<Schema>(this.collection._collectionName, this.variable, this.filters, schema);
    }
}
