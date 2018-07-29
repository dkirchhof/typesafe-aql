import { Collection } from "../Collection";
import { Field } from "../Field";

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