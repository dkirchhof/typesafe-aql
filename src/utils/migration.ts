import { Database } from "arangojs";
import { BaseCollection } from "arangojs/lib/cjs/collection";
import { Collection } from "../collections/Collection";
import { DocumentCollection } from "../collections/DocumentCollection";
import { EdgeCollection } from "../collections/EdgeCollection";

interface IRemoteCollection {
    id: string;
    name: string;
    status: number;
    type: number;
    isSystem: boolean;
    globallyUniqueId: string;
} 

export async function getMissingCollections(db: Database, localCollections: Collection<any>[]) {
    const remoteCollections: IRemoteCollection[] = await db.listCollections();
    const remoteCollectioNames = remoteCollections.map(collection => collection.name);

    return localCollections.filter(collection => 
        !remoteCollectioNames.includes(collection._collectionName)
    );
}

export async function createMissingCollections(db: Database, localCollections: Collection<any>[]) {
    Promise.all(
        localCollections.map(collection => {
            if(collection instanceof DocumentCollection) {
                return db.collection(collection._collectionName).create();
            } else if(collection instanceof EdgeCollection) {
                return db.edgeCollection(collection._collectionName).create();
            }
        })
    );
}