import { EdgeCollection } from "../EdgeCollection";
import { UserCollection } from "./UserCollection";
import { CourseCollection } from "./CourseCollection";

export class TeachesEdgeCollection extends EdgeCollection<UserCollection, CourseCollection> {
}

export const teachesEdgeCollection = new TeachesEdgeCollection("teaches");