import { Collection } from "./Collection";
import { IEdgeModel } from "../models/IEdgeModel";

export class EdgeCollection<ModelType extends IEdgeModel> extends Collection<ModelType> {
    _from: string;
    _to:   string;
}
