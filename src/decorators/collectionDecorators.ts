import { arangoStore } from "../Store";
import { CollectionConstructorType } from "../collections/Collection";

export function CollectionDescriptor(collectionName: string) {
    return function(target: CollectionConstructorType<any>) {
        const description = arangoStore.getOrRegisterCollectionDescription(target);

        description.collectionName = collectionName;

        if(target.name !== "Collection") {
            addParentFields(description, target);
        }
    }
}

function addParentFields(description: any, target: any) {
    const parent = Object.getPrototypeOf(target);

    if(parent) {
        const parentDescription = arangoStore.getCollectionDescription(parent);
        if(parentDescription) {
            description.fields.push(...parentDescription.fields);
        }
    }

    if(parent.name !== "Collection") {
        addParentFields(description, parent);
    }
} 
