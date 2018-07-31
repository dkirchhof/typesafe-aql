import { BooleanOperator } from "./BooleanOperator";

export function or(...operands: any[]) {
    return new BooleanOperator("OR", ...operands);
}