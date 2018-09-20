import { DocumentCollection } from "../../collections/DocumentCollection";
import { Edge } from "../../collectionMetadata/Edge";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { UserCollection } from "./UserCollection";
import { CollectionDescriptor } from "../../decorators/collectionDecorators";
import { ICourse } from "../models/ICourse";
import { FieldDescriptor } from "../../decorators/fieldDecorators";

@CollectionDescriptor("courses")
export class CourseCollection extends DocumentCollection<ICourse> {
    
    @FieldDescriptor()
    title: string;

    @FieldDescriptor()
    location: { name: string };
    
    taughtBy = new Edge("INBOUND", () => TeachesEdgeCollection, () => UserCollection);
}
