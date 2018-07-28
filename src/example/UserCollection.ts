import { Collection } from "../Collection";
import { Field } from "../Field";
import { Edge } from "../Edge";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { CourseCollection } from "./CourseCollection";

export class UserCollection extends Collection {
    firstname = new Field<string>();
    lastname = new Field<string>();
    age = new Field<number>();
    teaches = new Edge("OUTBOUND", TeachesEdgeCollection, CourseCollection);
}

export const userCollection = new UserCollection("users");