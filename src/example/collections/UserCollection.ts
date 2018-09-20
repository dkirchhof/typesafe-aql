import { Collection } from "../../collections";
import { Edge, Field } from "../../collectionMetadata";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { CourseCollection } from "./CourseCollection";
import { CollectionDescriptor } from "../../decorators";
import { IUser } from "../models/IUser";

@CollectionDescriptor("users")
export class UserCollection extends Collection<IUser> {
    firstname = new Field<string>();
    lastname = new Field<string>();
    age = new Field<number>();
    teaches = new Edge("OUTBOUND", () => TeachesEdgeCollection, () => CourseCollection);
}
