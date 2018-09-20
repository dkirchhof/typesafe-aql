import { EdgeCollection } from "../../collections";
import { CollectionDescriptor } from "../../decorators";
import { ITeaches } from "../models/ITeaches";

@CollectionDescriptor("teaches")
export class TeachesEdgeCollection extends EdgeCollection<ITeaches> {
}
