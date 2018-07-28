import { Database } from "arangojs";
import { Collection } from "./Collection";
import { createProxy, prettifyQuery } from "./utils";
import { ExecutableRelationQuery } from "./RelationQueryBuilder";
import { MappedSchema } from "./Schema";

export class QueryBuilder<CollectionType extends Collection> {

    constructor(
        private readonly collection: CollectionType,
        private readonly variable: string) {
            
    }

    return<Schema>(schemaCreator: (collection: CollectionType) => Schema) {
        const proxy = createProxy(this.collection, this.variable);
        const schema = schemaCreator(proxy);
        return new ExecutableQuery<Schema>(this.collection._collectionName, this.variable, schema);
    }
}

export class ExecutableQuery<Schema> {
    
    constructor(
        private readonly collectionName: string,
        private readonly variable: string,
        private readonly schema: Schema) {

    }

    toAQL(prettyPrint = false) {
        const fields = Object.entries(this.schema).map(([alias, field]) => {
            
            if(field instanceof ExecutableRelationQuery) {
                return `${alias}: (\n${field.toAQL(this.variable)}\n)`;
            }

            return `${alias}: ${field}`;

        }).join(",\n");

        const query = `FOR ${this.variable} IN ${this.collectionName}\nRETURN {\n${fields}\n}`;

        return prettyPrint ? prettifyQuery(query) : query;
    }
    
    async fetch(db: Database) {
        // return { } as MappedSchema<Schema>;

        const query = this.toAQL();
        const result = await db.query(query);

        return result.all() as Promise<MappedSchema<Schema>[]>;
    }
}