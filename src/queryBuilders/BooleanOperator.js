"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BooleanOperator {
    constructor(type, ...operands) {
        this.type = type;
        this.operands = operands;
    }
    toString() {
        return `(${this.operands.join(` ${this.type} `)})`;
    }
}
exports.BooleanOperator = BooleanOperator;
function and(...operands) {
    return new BooleanOperator("AND", ...operands);
}
exports.and = and;
function or(...operands) {
    return new BooleanOperator("OR", ...operands);
}
exports.or = or;
