import { Field } from "./Field";
import { QueryBuilder } from "./QueryBuilder";

export class Collection {
    _id = new Field<string>();
    _key = new Field<string>();
    _rev = new Field<string>();

    constructor(public readonly _collectionName: string) {

    }

    createQuery(variable: string) {
        return new QueryBuilder(this, variable);
    }
}