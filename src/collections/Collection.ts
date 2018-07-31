import { Field } from "../collectionMetadata/Field";
import { DocumentQueryBuilder } from "../queryBuilders/DocumentQueryBuilder";

export type CollectionConstructorType<Type extends Collection> = { new(...args: any[]): Type };

export abstract class Collection {
    _id = new Field<string>();
    _key = new Field<string>();
    _rev = new Field<string>();

    constructor(public readonly _collectionName: string) {
        
    }

    createQuery(variable: string) {
        return new DocumentQueryBuilder(variable, this);
    }
}