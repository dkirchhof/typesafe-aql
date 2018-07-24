import { Collection } from "./Collection";
import { prettifyQuery, createProxy } from "./utils";

export class RelationQueryBuilder<CollectionType extends Collection> {

    constructor(
        private readonly variable: string,
        private readonly edgeName: string,
        private readonly collection: CollectionType
    ) {

    }

    return <Schema>(schemaCreator: (collection: CollectionType) => Schema) {
        const proxy = createProxy(this.collection, this.variable);        
        const schema = schemaCreator(proxy);        
        return new ExecutableRelationQuery<Schema>(this.edgeName, this.variable, schema);
    }
}

export class ExecutableRelationQuery<Schema> {

    constructor(
        private readonly edgeName: string,
        private readonly variable: string,
        private readonly schema: Schema) {

    }

    toAQL(parentVariable: string, prettyPrint = false): string {

        const fields = Object.entries(this.schema).map(([alias, field]) => {
            
            if(field instanceof ExecutableRelationQuery) {
                return `${alias}: (\n${field.toAQL(this.variable)}\n)`;
            }

            return `${alias}: ${field}`;

        }).join(",\n");

        const query = `FOR ${this.variable} IN 1 OUTBOUND ${parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;

        return prettyPrint ? prettifyQuery(query) : query; 
    }
}