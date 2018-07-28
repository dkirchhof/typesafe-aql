import { Field } from "../Field";
import { Collection } from "../Collection";
import { Edge } from "../Edge";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { UserCollection } from "./UserCollection";

export class CourseCollection extends Collection {
    name = new Field<string>();
    taughtBy = new Edge("INBOUND", TeachesEdgeCollection, UserCollection);
}

export const courseCollection = new CourseCollection("courses");