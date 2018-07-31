"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prettifyQuery_1 = require("../utils/prettifyQuery");
class Query {
    constructor(variable, filters, limit, schema) {
        this.variable = variable;
        this.filters = filters;
        this.limit = limit;
        this.schema = schema;
    }
    filtersToAQL() {
        if (!this.filters.length) {
            return null;
        }
        return this.filters
            .map(filter => `FILTER ${filter}`)
            .join("\n");
    }
    limitToAQL() {
        if (!this.limit) {
            return null;
        }
        return `LIMIT ${this.limit}`;
    }
    schemaToAQL() {
        const fields = Object.entries(this.schema).map(([alias, field]) => {
            if (field.__type === "documentQuery") {
                return `${alias}: (\n${field.toAQL()}\n)`;
            }
            if (field.__type === "relationQuery") {
                return `${alias}: (\n${field.toAQL(this.variable)}\n)`;
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
