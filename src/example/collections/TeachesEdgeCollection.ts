import { EdgeCollection } from "../../collections/EdgeCollection";
import { CollectionDescriptor } from "../../decorators/collectionDecorators";
import { ITeaches } from "../models/ITeaches";

@CollectionDescriptor("teaches")
export class TeachesEdgeCollection extends EdgeCollection<ITeaches> {
}
