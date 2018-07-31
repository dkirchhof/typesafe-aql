"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = require("./Query");
class RelationQuery extends Query_1.Query {
    constructor(direction, edgeName, variable, filters, schema) {
        super(variable, filters, schema);
        this.direction = direction;
        this.edgeName = edgeName;
    }
    toAQL(parentVariable, prettyPrint = false) {
        const edgeVariable = `${this.variable}_edge`;
        const loop = `FOR ${this.variable}, ${edgeVariable} IN 1 ${this.direction} ${parentVariable} ${this.edgeName}`;
        return this.queryToAQL(loop, prettyPrint);
    }
}
exports.RelationQuery = RelationQuery;
