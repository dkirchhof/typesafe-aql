import { Collection } from "./Collection";
import { Field } from "../collectionMetadata/Field";
import { arangoStore } from "../Store";

export class EdgeCollection extends Collection {
    _from = new Field<string>();
    _to = new Field<string>();

    constructor(_collectionName: string) {
        super(_collectionName);

        arangoStore.edgeCollections.push(this);
    }
}
