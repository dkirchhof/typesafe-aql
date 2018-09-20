"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Predicate {
    constructor(field, operator, value) {
        this.field = field;
        this.operator = operator;
        this.value = value;
    }
    toString() {
        return `${this.field} ${this.operator} ${this.value}`;
    }
}
exports.Predicate = Predicate;
