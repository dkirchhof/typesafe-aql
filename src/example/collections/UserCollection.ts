import { DocumentCollection } from "../../collections/DocumentCollection";
import { Edge } from "../../collectionMetadata/Edge";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { CourseCollection } from "./CourseCollection";
import { CollectionDescriptor } from "../../decorators/collectionDecorators";
import { IUser } from "../models/IUser";
import { FieldDescriptor } from "../../decorators/fieldDecorators";

@CollectionDescriptor("users")
export class UserCollection extends DocumentCollection<IUser> {
    
    @FieldDescriptor()
    firstname: string;
    
    @FieldDescriptor()
    lastname: string;

    @FieldDescriptor()
    age: number;

    teaches = new Edge("OUTBOUND", () => TeachesEdgeCollection, () => CourseCollection);
}
