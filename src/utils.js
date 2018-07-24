"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
function createProxy(collection, variable) {
    return new Proxy(collection, {
        get: (target, key) => {
            if (target[key] instanceof Field_1.Field) {
                return `${variable}.${key.toString()}`;
            }
            return target[key];
        }
    });
}
exports.createProxy = createProxy;
function prettifyQuery(query, spaces = 2) {
    let indentation = 0;
    return query
        .split("\n")
        .map(line => {
        if (line.endsWith("}") || line.endsWith(")")) {
            indentation--;
        }
        const indentedLine = `${" ".repeat(indentation * spaces)}${line}`;
        if (line.endsWith("{") || line.endsWith("(")) {
            indentation++;
        }
        return indentedLine;
    })
        .join("\n");
}
exports.prettifyQuery = prettifyQuery;
