import { prettifyQuery } from "../utils/prettifyQuery";
import { IQueryOptions } from "./QueryOptions";

export abstract class Query {
    
    constructor(protected readonly options: IQueryOptions) { }

    private filtersToAQL() {
        if(!this.options.filters.length) {
            return null;
        }

        return this.options.filters
            .map(filter => `FILTER ${filter}`)
            .join("\n");
    }

    private limitToAQL() {
        if(!this.options.limit) {
            return null;
        }

        return `LIMIT ${this.options.limit}`;
    }

    private schemaToAQL() {
        const fields = Object.entries(this.options.schema).map(([alias, field]) => {
            
            if(field.__type === "documentQuery") {
                return `${alias}: (\n${field.toAQL()}\n)`;
            }

            if(field.__type === "relationQuery") {
                return `${alias}: (\n${field.toAQL(this.options.variable)}\n)`;
            }

            return `${alias}: ${field}`;

        }).join(",\n");

        return `RETURN {\n${fields}\n}`;
    }

    protected queryToAQL(loop: string, prettyPrint = false) {
        const query = [
            loop,
            this.filtersToAQL(),
            this.limitToAQL(),
            this.schemaToAQL(),
        ]
        .filter(Boolean)
        .join("\n");

        return prettyPrint ? prettifyQuery(query) : query;
    }
}