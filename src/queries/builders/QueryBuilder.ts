import { Collection } from "../../collections";
import { Field } from "../../collectionMetadata";
import { Filter, IQueryOptions } from "../";

export abstract class QueryBuilder<CollectionType extends Collection<any>> {
    protected readonly collectionProxy: CollectionType;
    protected readonly options: IQueryOptions = {
        variable: "",
        filters: [],
        limit: null,
        schema: null,
    }

    constructor(variable: string, protected readonly collection: CollectionType) {        
        this.collectionProxy = this.createProxy(collection, variable);
        this.options.variable = variable;
    }

    public filter(filterCreator: (collection: CollectionType) => Filter) {
        const filter = filterCreator(this.collectionProxy);
        this.options.filters.push(filter);

        return this;
    }

    public limit(value: number) {
        this.options.limit = value;

        return this;
    }

    protected createProxy<CollectionType extends Collection<any>>(collection: CollectionType, variable: string): CollectionType {
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