import { Collection } from "./Collection";
import { prettifyQuery, createProxy } from "./utils";

export class RelationQueryBuilder<CollectionType extends Collection> {

    constructor(
        private readonly parentVariable: string,
        private readonly variable: string,
        private readonly edgeName: string,
        private readonly collection: CollectionType) {

    }

    return <Schema>(schemaCreator: (collection: CollectionType) => Schema) {
        const proxy = createProxy(this.collection, this.variable);        
        const schema = schemaCreator(proxy);        
        return new ExecutableRelationQuery<Schema>(this.parentVariable, this.edgeName, this.variable, schema);
    }
}

export class ExecutableRelationQuery<Schema> {

    constructor(
        private readonly parentVariable: string,
        private readonly edgeName: string,
        private readonly variable: string,
        private readonly schema: Schema) {

    }

    toAQL(prettyPrint = false): string {

        const fields = Object.entries(this.schema).map(([alias, field]) => {
            
            if(field instanceof ExecutableRelationQuery) {
                return `${alias}: (\n${field.toAQL()}\n)`;
            }

            return `${alias}: ${field}`;

        }).join(",\n");

        const query = `FOR ${this.variable} IN 1 OUTBOUND ${this.parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;

        return prettyPrint ? prettifyQuery(query) : query; 
    }

    fetch() {
        return {} as Schema;
    }
}