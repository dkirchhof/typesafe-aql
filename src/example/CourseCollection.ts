import { Field } from "../collectionMetadata/Field";
import { DocumentCollection } from "../collections/DocumentCollection";
import { Edge } from "../collectionMetadata/Edge";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { UserCollection } from "./UserCollection";

export class CourseCollection extends DocumentCollection {
    name = new Field<string>();
    taughtBy = new Edge("INBOUND", TeachesEdgeCollection, UserCollection);
}

export const courseCollection = new CourseCollection("courses");