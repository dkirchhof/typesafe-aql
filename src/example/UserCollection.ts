import { Collection } from "../Collection";
import { Field } from "../Field";
import { Edge } from "../Edge";
import { teachesEdgeCollection } from "./TeachesEdgeCollection";
import { courseCollection } from "./CourseCollection";

export class UserCollection extends Collection {
    firstname = new Field<string>();
    lastname = new Field<string>();
    age = new Field<number>();
    courses = new Edge("OUTBOUND", teachesEdgeCollection, courseCollection);
}

export const userCollection = new UserCollection("users");