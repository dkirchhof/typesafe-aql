import { EdgeCollection } from "../collections/EdgeCollection";
import { EdgeCollectionDescriptor } from "../decorators/collectionDecorators";

@EdgeCollectionDescriptor("teaches")
export class TeachesEdgeCollection extends EdgeCollection {
}

export const teachesEdgeCollection = new TeachesEdgeCollection("teaches");