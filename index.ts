import { Database, aql } from "arangojs";

const dbServer = new Database();
const db = dbServer.useDatabase("test");

type TypeOrTypeOfArrayElement<Type> = Type extends Array<any> ? Type[0] : Type;

type ModelOptions<Model> = {
    fields: (keyof Model)[];
    relations?: {
        [s in keyof Model]?: ModelOptions<TypeOrTypeOfArrayElement<Model[s]>>
    }
};

class Collection<Model> {
    constructor(private readonly tableName: string) { }

    async getMany(options: ModelOptions<Model>) {

        const mappedFields = options.fields ? options.fields.map(field => `${field.toString()}: root.${field.toString()}`) : [];
        const mappedRelations = this.mapRelations<Model>("root", options.relations);

        const allFields = [
            ...mappedFields,
            ...mappedRelations,
        ];

        const query = `
            FOR root IN ${this.tableName}
            RETURN {
                ${allFields.join(",\n")}
            }
        `;

        console.log(query);

        const result = await db.query(query);
        return result.all() as Promise<Model[]>;

        // return result.all() as Promise<Pick<Model, keyof typeof options.fields>[]>;
    }

    private mapRelations<Type>(parent: string, relations?: { [s in keyof Type]?: ModelOptions<any> }) {
        
        if(!relations) {
            return [];
        }

        return Object.entries(relations).map(([key, value]: [string, ModelOptions<any>]) => {
            
            const mappedFields = value.fields ? value.fields.map(field => `${field.toString()}: t.${field.toString()}`) : []

            return `
                ${key}: (
                    FOR t IN 1 OUTBOUND ${parent} ${key}
                    RETURN {
                        ${mappedFields.join(",\n")}
                    }
                )
            `;

        });
    }

    async getOne(key: string) {
        return db.collection(this.tableName).document(key) as Promise<Model>;
    }
}

class User {
    public firstname: string = "";
    public lastname: string = "";

    public teaches: Course[] = [];
}

class Course {
    public name: string = "";

    public hasCategory: Category = { name: "" };
}

class Category {
    public name: string = "";
}

(async () => {

    const userCollection = new Collection<User>("users");

    const users = await userCollection.getMany({ 
        fields: ["firstname"],
        relations: { 
            teaches: { 
                fields: ["name", "hasCategory"],
                relations: {
                    hasCategory: {
                        fields: ["name"]
                    }
                }
            }
        }
    })

    console.log(users);

    // const user = await userCollection.getOne("265");
    // console.log(user);

})();