"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanOperator_1 = require("./BooleanOperator");
function and(...operands) {
    return new BooleanOperator_1.BooleanOperator("AND", ...operands);
}
exports.and = and;
