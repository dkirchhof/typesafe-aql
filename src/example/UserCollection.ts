import { DocumentCollection } from "../collections/DocumentCollection";
import { Field } from "../collectionMetadata/Field";
import { Edge } from "../collectionMetadata/Edge";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { CourseCollection } from "./CourseCollection";
import { DocumentCollectionDescriptor } from "../decorators/collectionDecorators";

@DocumentCollectionDescriptor("users")
export class UserCollection extends DocumentCollection {
    firstname = new Field<string>();
    lastname = new Field<string>();
    age = new Field<number>();
    teaches = new Edge("OUTBOUND", () => TeachesEdgeCollection, () => CourseCollection);
}
