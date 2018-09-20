"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = require("../Store");
class QueryBuilder {
    constructor(variable, collection) {
        this.collection = collection;
        this.options = {
            variable: "",
            filters: [],
            limit: null,
            schema: null,
        };
        this.collectionProxy = this.createProxy(collection, variable);
        this.options.variable = variable;
    }
    filter(filterCreator) {
        const filter = filterCreator(this.collectionProxy);
        this.options.filters.push(filter);
        return this;
    }
    limit(value) {
        this.options.limit = value;
        return this;
    }
    createProxy(collection, variable) {
        const collectionDescription = Store_1.arangoStore.getCollectionDescription(collection.constructor);
        return new Proxy(collection, {
            get: (target, key) => {
                if (collectionDescription.fields.includes(key.toString())) {
                    return `${variable}.${key.toString()}`;
                }
                return target[key];
            }
        });
    }
}
exports.QueryBuilder = QueryBuilder;
