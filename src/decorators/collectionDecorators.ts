import { arangoStore } from "../Store";
import { CollectionConstructorType } from "../collections/Collection";

export function DocumentCollectionDescriptor(collectionName: string) {
    return function(target: CollectionConstructorType<any>) {
        arangoStore.documentCollections.set(target.name, new target(collectionName));
    }
}

export function EdgeCollectionDescriptor(collectionName: string) {
    return function(target: CollectionConstructorType<any>) {
        arangoStore.edgeCollections.set(target.name, new target(collectionName));
    }
}