import { arangoStore } from "../Store";
import { CollectionConstructorType } from "../collections/Collection";

export function DocumentCollectionDescriptor(collectionName: string) {
    return function(target: CollectionConstructorType<any>) {
        arangoStore.registerDocumentCollection(target, collectionName);
    }
}

export function EdgeCollectionDescriptor(collectionName: string) {
    return function(target: CollectionConstructorType<any>) {
        arangoStore.registerEdgeCollection(target, collectionName);
    }
}