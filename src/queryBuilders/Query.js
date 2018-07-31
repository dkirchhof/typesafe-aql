"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RelationQuery_1 = require("./RelationQuery");
const prettifyQuery_1 = require("../utils/prettifyQuery");
class Query {
    constructor(variable, filters, schema) {
        this.variable = variable;
        this.filters = filters;
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
    schemaToAQL() {
        const fields = Object.entries(this.schema).map(([alias, field]) => {
            if (field instanceof RelationQuery_1.RelationQuery) {
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
            this.schemaToAQL(),
        ]
            .filter(Boolean)
            .join("\n");
        return prettyPrint ? prettifyQuery_1.prettifyQuery(query) : query;
    }
}
exports.Query = Query;
