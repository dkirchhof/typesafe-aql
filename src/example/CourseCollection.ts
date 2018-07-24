import { Field } from "../Field";
import { Collection } from "../Collection";
import { Relation } from "../Relation";
import { UserCollection } from "./UserCollection";

export class CourseCollection extends Collection {
    name = new Field<string>();
    teacher = new Relation("tought_by", UserCollection);
}

export const courseCollection = new CourseCollection("courses");