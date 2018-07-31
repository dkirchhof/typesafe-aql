import { DocumentCollection } from "../collections/DocumentCollection";
import { createProxy } from "../utils/createProxy";
import { prettifyQuery } from "../utils/prettifyQuery";
import { EdgeCollection } from "../collections/EdgeCollection";
import { EdgeDirection } from "../collectionMetadata/Edge";
import { QueryBuilder } from "./QueryBuilder";

export class RelationQueryBuilder<EdgeCollectionType extends EdgeCollection, ToCollectionType extends DocumentCollection> extends QueryBuilder<ToCollectionType> {
    private readonly edgeCollectionProxy: EdgeCollectionType;

    constructor(
        variable: string,
        collection: ToCollectionType,
        private readonly edgeCollection: EdgeCollectionType,
        private readonly direction: EdgeDirection
    ) {
        super(variable, collection);
        this.edgeCollectionProxy = this.createProxy(edgeCollection, `${variable}_edge`);
    }

    return <Schema>(schemaCreator: (collection: ToCollectionType, edge?: EdgeCollectionType) => Schema) {
        const schema = schemaCreator(this.collectionProxy, this.edgeCollectionProxy);

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
                return `${alias}: (\n${field.toAQL(this.variable)}\n)`;
            }

            return `${alias}: ${field}`;

        }).join(",\n");

        const edgeVariable = `${this.variable}_edge`;
        const query = `FOR ${this.variable}, ${edgeVariable} IN 1 ${this.direction} ${parentVariable} ${this.edgeName}\nRETURN {\n${fields}\n}`;

        return prettyPrint ? prettifyQuery(query) : query;
    }
}