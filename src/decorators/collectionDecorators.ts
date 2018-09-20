import { arangoStore } from "../Store";
import { CollectionConstructorType } from "../collections/Collection";

export function CollectionDescriptor(collectionName: string) {
    return function(target: CollectionConstructorType<any>) {
        arangoStore.registerDocumentCollection(target, collectionName);
    }
}
