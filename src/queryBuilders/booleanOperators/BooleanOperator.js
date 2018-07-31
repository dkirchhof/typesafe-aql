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
