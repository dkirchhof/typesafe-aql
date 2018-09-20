import { Collection } from "../../collections/Collection";
import { Field } from "../../collectionMetadata/Field";
import { Edge } from "../../collectionMetadata/Edge";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { CourseCollection } from "./CourseCollection";
import { CollectionDescriptor } from "../../decorators/collectionDecorators";
import { IUser } from "../models/IUser";

@CollectionDescriptor("users")
export class UserCollection extends Collection<IUser> {
    firstname = new Field<string>();
    lastname = new Field<string>();
    age = new Field<number>();
    teaches = new Edge("OUTBOUND", () => TeachesEdgeCollection, () => CourseCollection);
}
