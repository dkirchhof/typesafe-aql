import { Database } from "arangojs";
import { Collection } from "../collections/Collection";
import { prettifyQuery } from "../utils/prettifyQuery";
import { RelationQuery } from "./RelationQueryBuilder";
import { MappedSchema } from "./Schema";
import { BooleanOperator } from "./booleanOperators/BooleanOperator";
import { Predicate } from "./Predicate";
import { QueryBuilder } from "./QueryBuilder";

export class DocumentQueryBuilder<CollectionType extends Collection> extends QueryBuilder<CollectionType> {

    return<Schema>(schemaCreator: (collection: CollectionType) => Schema) {
        const schema = schemaCreator(this.collectionProxy);

        return new DocumentQuery<Schema>(this.collection._collectionName, this.variable, this.filters, schema);
    }
}

export class DocumentQuery<Schema> {
    
    constructor(
        private readonly collectionName: string,
        private readonly variable: string,
        private readonly filters: (Predicate<any> | BooleanOperator)[],
        private readonly schema: Schema) {

    }

    private forLoopToAQL() {
        return `FOR ${this.variable} IN ${this.collectionName}`;
    }

    private filtersToAQL() {
        if(!this.filters.length) {
            return null;
        }

        return this.filters
            .map(filter => `FILTER ${filter}`)
            .join("\n");
    }

    private schemaToAQL() {
        const fields = Object.entries(this.schema).map(([alias, field]) => {
            
            if(field instanceof RelationQuery) {
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

        return prettyPrint ? prettifyQuery(query) : query;
    }
    
    async fetch(db: Database) {
        // return { } as MappedSchema<Schema>;

        const query = this.toAQL();
        const result = await db.query(query);

        return result.all() as Promise<MappedSchema<Schema>[]>;
    }
}