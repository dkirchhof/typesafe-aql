import { Collection } from "../collections/Collection";
import { Field } from "../collectionMetadata/Field";
import { Filter } from "./Filter";

export abstract class QueryBuilder<CollectionType extends Collection> {
    protected readonly collectionProxy: CollectionType;
    protected readonly filters: Filter[] = [];
    protected limitTo?: number; 

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

    public limit(value: number) {
        this.limitTo = value;

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