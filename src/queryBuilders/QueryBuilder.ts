import { Collection } from "../collections/Collection";
import { Predicate } from "./Predicate";
import { BooleanOperator } from "./BooleanOperator";
import { Field } from "../collectionMetadata/Field";

type Filter = Predicate<any> | BooleanOperator;

export abstract class QueryBuilder<CollectionType extends Collection> {
    protected readonly collectionProxy: CollectionType;
    protected readonly filters: Filter[] = [];

    constructor(
        protected readonly variable: string, 
        protected readonly collection: CollectionType
    ) {        
        this.collectionProxy = this.createProxy(collection, variable);
    }

    public filter(filterCreator: (collection: CollectionType) => Filter) {
        const filter = filterCreator(this.collectionProxy);
        this.filters.push(filter);

        return this;
    }

    protected createProxy<CollectionType extends Collection>(collection: CollectionType, variable: string): CollectionType {
        return new Proxy(collection, {
            get: (target: any, key) => { 
                if(target[key] instanceof Field) {
                    return `${variable}.${key.toString()}`;
                }
                return target[key]; 
            }
        });
    }
}