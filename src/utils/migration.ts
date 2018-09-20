import { Database } from "arangojs";
import { Collection, EdgeCollection } from "../collections";

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
            if(collection instanceof EdgeCollection) {
                return db.edgeCollection(collection._collectionName).create();
            }
            return db.collection(collection._collectionName).create();
        })
    );
}