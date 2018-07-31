import { BooleanOperator } from "./BooleanOperator";

export function and(...operands: any[]) {
    return new BooleanOperator("AND", ...operands);
}