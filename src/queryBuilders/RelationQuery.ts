import { Query } from "./Query";
import { Filter } from "./Filter";
import { EdgeDirection } from "../collectionMetadata/Edge";

export class RelationQuery<Schema> extends Query<Schema> {
    private __type = "relationQuery";

    constructor(
        private readonly direction: EdgeDirection,
        private readonly edgeName: string,
        variable: string,
        filters: Filter[],
        schema: Schema
    ) {
        super(variable, filters, schema);
    }

    public toAQL(parentVariable: string, prettyPrint = false) {
        const edgeVariable = `${this.variable}_edge`;
        const loop = `FOR ${this.variable}, ${edgeVariable} IN 1 ${this.direction} ${parentVariable} ${this.edgeName}`;

        return this.queryToAQL(loop, prettyPrint);
    }
}