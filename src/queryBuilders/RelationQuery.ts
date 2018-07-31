import { Query } from "./Query";
import { EdgeDirection } from "../collectionMetadata/Edge";
import { IQueryOptions } from "./QueryOptions";

export class RelationQuery<Schema> extends Query {
    private __type = "relationQuery";

    constructor(private readonly direction: EdgeDirection, private readonly edgeName: string, options: IQueryOptions) {
        super(options);
    }

    public toAQL(parentVariable: string, prettyPrint = false) {
        const edgeVariable = `${this.options.variable}_edge`;
        const loop = `FOR ${this.options.variable}, ${edgeVariable} IN 1 ${this.direction} ${parentVariable} ${this.edgeName}`;

        return this.queryToAQL(loop, prettyPrint);
    }
}