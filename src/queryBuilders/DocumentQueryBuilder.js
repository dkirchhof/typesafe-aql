"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prettifyQuery_1 = require("../utils/prettifyQuery");
const RelationQueryBuilder_1 = require("./RelationQueryBuilder");
const QueryBuilder_1 = require("./QueryBuilder");
class DocumentQueryBuilder extends QueryBuilder_1.QueryBuilder {
    return(schemaCreator) {
        const schema = schemaCreator(this.collectionProxy);
        return new DocumentQuery(this.collection._collectionName, this.variable, this.filters, schema);
    }
}
exports.DocumentQueryBuilder = DocumentQueryBuilder;
class DocumentQuery {
    constructor(collectionName, variable, filters, schema) {
        this.collectionName = collectionName;
        this.variable = variable;
        this.filters = filters;
        this.schema = schema;
    }
    forLoopToAQL() {
        return `FOR ${this.variable} IN ${this.collectionName}`;
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
            if (field instanceof RelationQueryBuilder_1.RelationQuery) {
                return `${alias}: (\n${field.toAQL(this.variable)}\n)`;
            }
            return `${alias}: ${field}`;
        }).join(",\n");
        return `RETURN {\n${fields}\n}`;
    }
    toAQL(prettyPrint = false) {
        const query = [
            this.forLoopToAQL(),
            this.filtersToAQL(),
            this.schemaToAQL(),
        ]
            .filter(Boolean)
            .join("\n");
        return prettyPrint ? prettifyQuery_1.prettifyQuery(query) : query;
    }
    async fetch(db) {
        // return { } as MappedSchema<Schema>;
        const query = this.toAQL();
        const result = await db.query(query);
        return result.all();
    }
}
exports.DocumentQuery = DocumentQuery;
