import { DocumentCollection } from "../collections/DocumentCollection";
import { createProxy } from "../utils/createProxy";
import { prettifyQuery } from "../utils/prettifyQuery";
import { EdgeCollection } from "../collections/EdgeCollection";
import { EdgeDirection } from "../collectionMetadata/Edge";

export class RelationQueryBuilder<EdgeCollectionType extends EdgeCollection, ToCollectionType extends DocumentCollection> {

    constructor(
        private readonly variable: string,
        private readonly direction: EdgeDirection,
        private readonly edgeCollection: EdgeCollectionType,
        private readonly toCollection: ToCollectionType,
    ) {

    }

    return <Schema>(schemaCreator: (v: ToCollectionType, e?: EdgeCollectionType) => Schema) {
        const toCollectionProxy = createProxy(this.toCollection, `${this.variable}_v`);
        const edgeCollectionProxy = createProxy(this.edgeCollection, `${this.variable}_e`);
        const schema = schemaCreator(toCollectionProxy, edgeCollectionProxy);

        return new RelationQuery<Schema>(this.variable, this.direction, this.edgeCollection._collectionName, schema);
    }
}

export class RelationQuery<Schema> {

    constructor(
        private readonly variable: string,
        private readonly direction: EdgeDirection,
        private readonly edgeName: string,
        private readonly schema: Schema) {

    }

    toAQL(parentVariable: string, prettyPrint = false): string {

        const fields = Object.entries(this.schema).map(([alias, field]) => {

            if(field instanceof RelationQuery) {
                const vertexVariable = `${this.variable}_v`;
                return `${alias}: (\n${field.toAQL(vertexVariable)}\n)`;
            }

            return `${alias}: ${field}`;

        }).join(",\n");

        const vertexVariable = `${this.variable}_v`;
        const edgeVariable = `${this.variable}_e`;
        const query = `FOR ${vertexVariable}, ${edgeVariable} IN 1 ${this.direction} ${parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;

        return prettyPrint ? prettifyQuery(query) : query;
    }
}