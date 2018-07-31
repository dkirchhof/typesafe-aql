"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../collectionMetadata/Field");
class QueryBuilder {
    constructor(variable, collection) {
        this.variable = variable;
        this.collection = collection;
        this.filters = [];
        this.collectionProxy = this.createProxy(collection, variable);
    }
    filter(filterCreator) {
        const filter = filterCreator(this.collectionProxy);
        this.filters.push(filter);
        return this;
    }
    createProxy(collection, variable) {
        return new Proxy(collection, {
            get: (target, key) => {
                if (target[key] instanceof Field_1.Field) {
                    return `${variable}.${key.toString()}`;
                }
                return target[key];
            }
        });
    }
}
exports.QueryBuilder = QueryBuilder;
