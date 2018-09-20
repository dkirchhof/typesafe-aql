import { Field } from "../collectionMetadata/Field";
import { IEdgeModel } from "../models/IEdgeModel";
import { Collection } from "./Collection";

export abstract class EdgeCollection<ModelType extends IEdgeModel> extends Collection<ModelType> {
    _from = new Field<string>();
    _to = new Field<string>();
}
