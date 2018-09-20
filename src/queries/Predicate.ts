import { Field } from "../collectionMetadata";

export class Predicate<Type> {
    constructor(
        private readonly field: Field<Type>,
        private readonly operator: string,
        private readonly value: Type | Field<Type>) {

    }

    toString() {
        return `${this.field} ${this.operator} ${this.value}`;
    }
}