import { Collection } from "../../collections/Collection";
import { Field } from "../../collectionMetadata/Field";
import { Edge } from "../../collectionMetadata/Edge";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { UserCollection } from "./UserCollection";
import { CollectionDescriptor } from "../../decorators/collectionDecorators";
import { ICourse } from "../models/ICourse";

@CollectionDescriptor("courses")
export class CourseCollection extends Collection<ICourse> {
    title = new Field<string>();
    location = new Field<{ name: string }>();
    taughtBy = new Edge("INBOUND", () => TeachesEdgeCollection, () => UserCollection);
}
