import { Collection } from "./Collection";
import { Field } from "./Field";

export class EdgeCollection extends Collection {
    _from = new Field<string>();
    _to = new Field<string>();

    constructor(_collectionName: string) {
        super(_collectionName);
    }
}