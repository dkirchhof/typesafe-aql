import { EdgeCollection } from "../../collections/EdgeCollection";
import { EdgeCollectionDescriptor } from "../../decorators/collectionDecorators";
import { ITeaches } from "../models/ITeaches";

@EdgeCollectionDescriptor("teaches")
export class TeachesEdgeCollection extends EdgeCollection<ITeaches> {
}
