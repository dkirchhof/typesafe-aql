import { Collection } from "../../collections";
import { Edge, Field } from "../../collectionMetadata";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { UserCollection } from "./UserCollection";
import { CollectionDescriptor } from "../../decorators";
import { ICourse } from "../models/ICourse";

@CollectionDescriptor("courses")
export class CourseCollection extends Collection<ICourse> {
    title = new Field<string>();
    location = new Field<{ name: string }>();
    taughtBy = new Edge("INBOUND", () => TeachesEdgeCollection, () => UserCollection);
}
