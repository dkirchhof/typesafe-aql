import { Collection } from "../collections/Collection";
import { Field } from "../collectionMetadata/Field";

export function createProxy(collection: Collection, variable: string) {
    return new Proxy(collection, {
        get: (target: any, key) => { 
            if(target[key] instanceof Field) {
                return `${variable}.${key.toString()}`;
            }
            return target[key]; 
        }
    });
}