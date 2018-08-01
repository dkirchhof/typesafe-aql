import { Field } from "../collectionMetadata/Field";

export type CollectionConstructorType<Type extends Collection<any>> = { new(...args: any[]): Type };

export abstract class Collection<ModelType> {
    _id = new Field<string>();
    _key = new Field<string>();
    _rev = new Field<string>();

    constructor(public readonly _collectionName: string) { }
}