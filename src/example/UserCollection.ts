import { DocumentCollection } from "../collections/DocumentCollection";
import { Field } from "../collectionMetadata/Field";
import { Edge } from "../collectionMetadata/Edge";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { CourseCollection } from "./CourseCollection";

export class UserCollection extends DocumentCollection {
    firstname = new Field<string>();
    lastname = new Field<string>();
    age = new Field<number>();
    teaches = new Edge("OUTBOUND", TeachesEdgeCollection, CourseCollection);
}

export const userCollection = new UserCollection("users");