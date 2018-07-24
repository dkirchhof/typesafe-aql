import { QueryBuilder } from "./QueryBuilder";

export class Collection {
    constructor(public readonly collectionName: string) {

    }

    createQuery(variable: string) {
        return new QueryBuilder(this, variable);
    }
}