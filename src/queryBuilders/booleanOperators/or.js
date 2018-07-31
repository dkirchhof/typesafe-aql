"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BooleanOperator_1 = require("./BooleanOperator");
function or(...operands) {
    return new BooleanOperator_1.BooleanOperator("OR", ...operands);
}
exports.or = or;
