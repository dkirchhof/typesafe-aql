import { Field } from "../Field";
import { Collection } from "../Collection";
import { Edge } from "../Edge";
import { teachesEdgeCollection } from "./TeachesEdgeCollection";
import { userCollection } from "./UserCollection";

export class CourseCollection extends Collection {
    name = new Field<string>();
    teacher = new Edge("INBOUND", teachesEdgeCollection, userCollection);
}

export const courseCollection = new CourseCollection("courses");