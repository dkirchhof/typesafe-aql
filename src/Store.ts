import { CollectionConstructorType, Collection } from "./collections/Collection";

interface ICollectionDescription {
    collection: Collection<any>;
    collectionName: string;
    fields: string[];
}

class ArangoStore {
    private readonly collectionDescriptions: Map<string, ICollectionDescription> = new Map();

    public getCollection<CollectionType extends Collection<any>>(constructor: CollectionConstructorType<CollectionType>) {
        return this.collectionDescriptions.get(constructor.name)!.collection as CollectionType;
    }

    public getCollectionDescription(constructor: CollectionConstructorType<any>) {
        return this.collectionDescriptions.get(constructor.name);
    }

    public getOrRegisterCollectionDescription(constructor: CollectionConstructorType<any>) {
        let description = this.getCollectionDescription(constructor);

        if(!description) {
            description = { 
                collection: new constructor(),
                collectionName: "",
                fields: [],
            };

            this.collectionDescriptions.set(constructor.name, description);
        }

        return description;
    }

    public get allCollections() {
        return [...this.collectionDescriptions.values()].map(d => d.collection);
    }
}

export const arangoStore = new ArangoStore();
