import { Collection } from "../collections/Collection";
import { QueryBuilder } from "./QueryBuilder";
import { DocumentQuery } from "./DocumentQuery";

export class DocumentQueryBuilder<CollectionType extends Collection<ModelType>, ModelType> extends QueryBuilder<CollectionType> {

    return<Schema extends object>(schemaCreator: (collection: CollectionType) => Schema) {
        this.options.schema = schemaCreator(this.collectionProxy);

        return new DocumentQuery<Schema>(this.collection._collectionName, this.options);
    }

    returnAll() {
        return new DocumentQuery<ModelType>(this.collection._collectionName, this.options);
    }
}
