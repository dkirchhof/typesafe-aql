import { DocumentCollection } from "./collections/DocumentCollection";
import { EdgeCollection } from "./collections/EdgeCollection";

class ArangoStore {
    public readonly documentCollections: DocumentCollection[] = [];
    public readonly edgeCollections: EdgeCollection[] = [];
}

export const arangoStore = new ArangoStore();
