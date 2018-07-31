import { Predicate } from "./Predicate";
import { BooleanOperator } from "./BooleanOperator";

export type Filter = Predicate<any> | BooleanOperator;
