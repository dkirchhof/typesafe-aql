export class Predicate<Type> {
    constructor(
        private readonly field: Type,
        private readonly operator: string,
        private readonly value: Type | Type) {

    }

    toString() {
        return `${this.field} ${this.operator} ${this.value}`;
    }
}