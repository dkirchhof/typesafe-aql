import { Database } from "arangojs";
import { Collection } from "./Collection";
import { DocumentQueryBuilder } from "../queryBuilders/DocumentQueryBuilder";
import { IDocumentModel } from "../models/IDocumentModel";

export class DocumentCollection<ModelType extends IDocumentModel> extends Collection<ModelType> {
    createQuery(variable: string) {
        return new DocumentQueryBuilder(variable, this);
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
