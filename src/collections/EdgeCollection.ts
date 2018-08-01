import { Collection } from "./Collection";
import { Field } from "../collectionMetadata/Field";
import { IEdgeModel } from "../models/IEdgeModel";

export class EdgeCollection<ModelType extends IEdgeModel> extends Collection<ModelType> {
    _from = new Field<string>();
    _to = new Field<string>();
}
