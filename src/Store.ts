import { Collection, CollectionConstructorType } from "./collections/Collection";

class ArangoStore {
    private readonly collections: Map<string, Collection<any>> = new Map();

    public getCollection<CollectionType extends Collection<any>>(constructor: CollectionConstructorType<CollectionType>) {
        return this.collections.get(constructor.name) as CollectionType;
    }

    public registerDocumentCollection(constructor: CollectionConstructorType<any>, collectionName: string) {
        this.collections.set(constructor.name, new constructor(collectionName));
    }

    public get allCollections() {
        return [...this.collections.values()];
    }
}

export const arangoStore = new ArangoStore();
