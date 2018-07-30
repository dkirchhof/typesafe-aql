import { DocumentCollection } from "./collections/DocumentCollection";
import { EdgeCollection } from "./collections/EdgeCollection";
import { CollectionConstructorType, Collection } from "./collections/Collection";

class ArangoStore {
    private readonly documentCollections: Map<string, DocumentCollection> = new Map();
    private readonly edgeCollections: Map<string, EdgeCollection> = new Map();

    public getDocumentCollection<CollectionType extends DocumentCollection>(constructor: CollectionConstructorType<CollectionType>) {
        return this.documentCollections.get(constructor.name) as CollectionType;
    }

    public getEdgeCollection<CollectionType extends EdgeCollection>(constructor: CollectionConstructorType<CollectionType>) {
        return this.edgeCollections.get(constructor.name) as CollectionType;
    }

    public registerDocumentCollection(constructor: CollectionConstructorType<any>, collectionName: string) {
        this.documentCollections.set(constructor.name, new constructor(collectionName));
    }

    public registerEdgeCollection(constructor: CollectionConstructorType<any>, collectionName: string) {
        this.edgeCollections.set(constructor.name, new constructor(collectionName));
    }

    public get allCollections() {
        return [
            ...this.documentCollections.values(),
            ...this.edgeCollections.values(),
        ];
    }
}

export const arangoStore = new ArangoStore();
