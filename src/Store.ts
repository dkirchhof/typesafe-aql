import { DocumentCollection } from "./collections/DocumentCollection";
import { EdgeCollection } from "./collections/EdgeCollection";

class ArangoStore {
    public readonly documentCollections: Map<string, DocumentCollection> = new Map();
    public readonly edgeCollections: Map<string, EdgeCollection> = new Map();
}

export const arangoStore = new ArangoStore();
