import { Field } from "../collectionMetadata";
import { IEdgeModel } from "../models";
import { Collection } from ".";

export abstract class EdgeCollection<ModelType extends IEdgeModel> extends Collection<ModelType> {
    _from = new Field<string>();
    _to = new Field<string>();
}
