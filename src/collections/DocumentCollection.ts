import { Collection } from "./Collection";
import { DocumentQueryBuilder } from "../queryBuilders/DocumentQueryBuilder";

export class DocumentCollection extends Collection {
    createQuery(variable: string) {
        return new DocumentQueryBuilder(variable, this);
    }   
}
