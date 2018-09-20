import { Database } from "arangojs";
import { Field } from "../collectionMetadata";
import { DocumentQueryBuilder } from "../queries/builders";

export type CollectionConstructorType<Type extends Collection<any>> = { new(...args: any[]): Type };

export abstract class Collection<ModelType> {
    _id = new Field<string>();
    _key = new Field<string>();
    _rev = new Field<string>();

    constructor(public readonly _collectionName: string) { }

    createQuery(variable: string) {
        return new DocumentQueryBuilder<this, ModelType>(variable, this);
    }

    public async getOne(db: Database, key: string): Promise<ModelType | null> {
        try {
            const result = await db.collection(this._collectionName).document(key);
            return result;
        } catch(e) {
            if(e.code === 404) {
                return null;
            }

            throw e;
        }
    }

    public async getMany(db: Database, keys: string[]): Promise<ModelType[]> {
        return db.collection(this._collectionName).lookupByKeys(keys);
    }

    public async getAll(db: Database): Promise<ModelType[]> {
        const result = await db.collection(this._collectionName).all();
        return result.all();
    }
}