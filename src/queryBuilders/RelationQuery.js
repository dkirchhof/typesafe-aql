"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Query_1 = require("./Query");
class RelationQuery extends Query_1.Query {
    constructor(direction, edgeName, options) {
        super(options);
        this.direction = direction;
        this.edgeName = edgeName;
        this.__type = "relationQuery";
    }
    toAQL(parentVariable, prettyPrint = false) {
        const edgeVariable = `${this.options.variable}_edge`;
        const loop = `FOR ${this.options.variable}, ${edgeVariable} IN 1 ${this.direction} ${parentVariable} ${this.edgeName}`;
        return this.queryToAQL(loop, prettyPrint);
    }
}
exports.RelationQuery = RelationQuery;
