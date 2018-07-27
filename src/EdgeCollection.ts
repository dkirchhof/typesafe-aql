import { Collection } from "./Collection";
import { Field } from "./Field";

export class EdgeCollection<FromType extends Collection, ToType extends Collection> extends Collection {
    _from = new Field<string>();
    _to = new Field<string>();

    constructor(collectionName: string) {
        super(collectionName);
    }
}