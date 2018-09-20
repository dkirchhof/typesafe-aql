import { Query } from "./Query";
import { Database } from "arangojs";
import { IQueryOptions } from "./QueryOptions";

export class DocumentQuery<Schema> extends Query {
    private __type = "documentQuery";

    constructor(private readonly collectionName: string, options: IQueryOptions) {    
        super(options);
    }

    public toAQL(prettyPrint = false) {
        const loop = `FOR ${this.options.variable} IN ${this.collectionName}`;
        
        return this.queryToAQL(loop, prettyPrint);
    }

    async fetch(db: Database): Promise<Schema[]> {
        const query = this.toAQL();
        const result = await db.query(query);

        return result.all();
    }
}