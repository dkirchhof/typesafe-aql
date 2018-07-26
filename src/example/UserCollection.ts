import { Collection } from "../Collection";
import { Field } from "../Field";
import { Relation } from "../Relation";
import { CourseCollection } from "./CourseCollection";

export class UserCollection extends Collection {
    firstname = new Field<string>();
    lastname = new Field<string>();
    age = new Field<number>();
    courses = new Relation("OUTBOUND", "teaches", CourseCollection);
}

export const userCollection = new UserCollection("users");