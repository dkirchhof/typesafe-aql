"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prettifyQuery_1 = require("../utils/prettifyQuery");
const _1 = require(".");
class Query {
    constructor(options) {
        this.options = options;
    }
    filtersToAQL() {
        if (!this.options.filters.length) {
            return null;
        }
        return this.options.filters
            .map(filter => `FILTER ${filter}`)
            .join("\n");
    }
    limitToAQL() {
        if (!this.options.limit) {
            return null;
        }
        return `LIMIT ${this.options.limit}`;
    }
    schemaToAQL() {
        if (!this.options.schema) {
            return `RETURN ${this.options.variable}`;
        }
        const fields = Object.entries(this.options.schema).map(([alias, field]) => {
            if (field instanceof _1.DocumentQuery) {
                return `${alias}: (\n${field.toAQL()}\n)`;
            }
            if (field instanceof _1.RelationQuery) {
                return `${alias}: (\n${field.toAQL(this.options.variable)}\n)`;
            }
            return `${alias}: ${field}`;
        }).join(",\n");
        return `RETURN {\n${fields}\n}`;
    }
    queryToAQL(loop, prettyPrint = false) {
        const query = [
            loop,
            this.filtersToAQL(),
            this.limitToAQL(),
            this.schemaToAQL(),
        ]
            .filter(Boolean)
            .join("\n");
        return prettyPrint ? prettifyQuery_1.prettifyQuery(query) : query;
    }
}
exports.Query = Query;
