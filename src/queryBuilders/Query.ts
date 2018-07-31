import { Filter } from "./Filter";
import { prettifyQuery } from "../utils/prettifyQuery";

export abstract class Query<Schema> {
    
    constructor(
        protected readonly variable: string,
        private readonly filters: Filter[],
        private readonly schema: Schema
    ) {

    }

    private filtersToAQL() {
        if(!this.filters.length) {
            return null;
        }

        return this.filters
            .map(filter => `FILTER ${filter}`)
            .join("\n");
    }

    private schemaToAQL(): string {
        const fields = Object.entries(this.schema).map(([alias, field]) => {
            
            if(field.__type === "documentQuery") {
                return `${alias}: (\n${field.toAQL()}\n)`;
            }

            if(field.__type === "relationQuery") {
                return `${alias}: (\n${field.toAQL(this.variable)}\n)`;
            }

            return `${alias}: ${field}`;

        }).join(",\n");

        return `RETURN {\n${fields}\n}`;
    }

    protected queryToAQL(loop: string, prettyPrint = false) {
        const query = [
            loop,
            this.filtersToAQL(),
            this.schemaToAQL(),
        ]
        .filter(Boolean)
        .join("\n");

        return prettyPrint ? prettifyQuery(query) : query;
    }
}