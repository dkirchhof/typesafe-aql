import { IDocumentModel } from "./IDocumentModel";

export interface IEdgeModel extends IDocumentModel {
    _from: string;
    _to: string;
}