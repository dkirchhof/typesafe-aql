import { Database } from "arangojs";
import { Query, IQueryOptions, MappedSchema } from ".";

export class DocumentQuery<Schema> extends Query {
    private __type = "documentQuery";

    constructor(private readonly collectionName: string, options: IQueryOptions) {    
        super(options);
    }

    public toAQL(prettyPrint = false) {
        const loop = `FOR ${this.options.variable} IN ${this.collectionName}`;
        
        return this.queryToAQL(loop, prettyPrint);
    }

    async fetch(db: Database): Promise<MappedSchema<Schema>[]> {
        const query = this.toAQL();
        const result = await db.query(query);

        return result.all();
    }
}