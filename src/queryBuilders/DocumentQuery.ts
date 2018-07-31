import { Query } from "./Query";
import { Filter } from "./Filter";
import { Database } from "../../node_modules/arangojs";
import { MappedSchema } from "./Schema";

export class DocumentQuery<Schema> extends Query<Schema> {
    private __type = "documentQuery";

    constructor(
        private readonly collectionName: string,
        variable: string,
        filters: Filter[],
        schema: Schema
    ) {    
        super(variable, filters, schema);
    }

    public toAQL(prettyPrint = false) {
        const loop = `FOR ${this.variable} IN ${this.collectionName}`;
        
        return this.queryToAQL(loop, prettyPrint);
    }

    async fetch(db: Database): Promise<MappedSchema<Schema>[]> {
        const query = this.toAQL();
        const result = await db.query(query);

        return result.all();
    }
}