import { IDocumentModel } from "../../models/IDocumentModel";

export interface IUser extends IDocumentModel {
    firstname: string;
    lastname: string;
    age: number;
}