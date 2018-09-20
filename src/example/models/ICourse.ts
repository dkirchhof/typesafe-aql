import { IDocumentModel } from "../../models/IDocumentModel";

export interface ICourse extends IDocumentModel {
    title: string;
    location: { name: string; };
}