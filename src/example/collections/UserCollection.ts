import { DocumentCollection } from "../../collections/DocumentCollection";
import { Field } from "../../collectionMetadata/Field";
import { Edge } from "../../collectionMetadata/Edge";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { CourseCollection } from "./CourseCollection";
import { DocumentCollectionDescriptor } from "../../decorators/collectionDecorators";
import { IUser } from "../models/IUser";

@DocumentCollectionDescriptor("users")
export class UserCollection extends DocumentCollection<IUser> {
    firstname = new Field<string>();
    lastname = new Field<string>();
    age = new Field<number>();
    teaches = new Edge("OUTBOUND", () => TeachesEdgeCollection, () => CourseCollection);
}
