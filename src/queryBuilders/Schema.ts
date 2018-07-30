import { Field } from "../collectionMetadata/Field";
import { RelationQuery } from "./RelationQueryBuilder";

export type MappedSchema<T> = { 
    [s in keyof T]: MappedType<T[s]>
};

type MappedType<T> = 
    T extends Field<infer U> ? U : 
    T extends RelationQuery<infer U> ? MappedSchema<U>[] :
    T;