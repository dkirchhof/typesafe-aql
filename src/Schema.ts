import { Field } from "./Field";
import { ExecutableRelationQuery } from "./RelationQueryBuilder";

export type MappedSchema<T> = { 
    [s in keyof T]: MappedType<T[s]>
};

type MappedType<T> = 
    T extends Field<infer U> ? U : 
    T extends ExecutableRelationQuery<infer U> ? MappedSchema<U>[] :
    T;