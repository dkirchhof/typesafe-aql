import { arangoStore } from "../Store";
import { FieldDescriptor } from "../decorators/fieldDecorators";

export type CollectionConstructorType<Type extends Collection<any>> = { new(...args: any[]): Type };

export abstract class Collection<ModelType> {

    @FieldDescriptor()
    _id:  string;

    @FieldDescriptor()
    _key: string;

    @FieldDescriptor()
    _rev: string;

    public get _collectionName() {
        return arangoStore.getCollectionDescription(this.constructor as any)!.collectionName;
    }
}
