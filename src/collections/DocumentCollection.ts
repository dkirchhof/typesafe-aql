import { Collection } from "./Collection";
import { arangoStore } from "../Store";

export class DocumentCollection extends Collection {
    constructor(_collectionName: string) {
        super(_collectionName);

        arangoStore.documentCollections.push(this);
    }
}
