import { arangoStore } from "../Store";

export function FieldDescriptor() {
    return function(target: any, key: string) {
        const description = arangoStore.getOrRegisterCollectionDescription(target.constructor);

        description.fields.push(key);
    }
}