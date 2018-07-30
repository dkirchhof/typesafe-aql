import { Collection } from "./Collection";
import { Field } from "../collectionMetadata/Field";

export class EdgeCollection extends Collection {
    _from = new Field<string>();
    _to = new Field<string>();
}
