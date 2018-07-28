"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const Field_1 = require("./Field");
const KEYWORDS = [
    "FOR",
    "IN",
    "RETURN",
    "OUTBOUND",
    "INBOUND",
    "ANY",
];
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
    const indented = query
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
    const coloredKeywords = KEYWORDS.reduce((result, keyword) => result.replace(new RegExp(`\\b${keyword}\\b`, "g"), chalk_1.default.blue(keyword)), indented);
    // const coloredFieldNames = coloredKeywords.replace(/\w+:/g, chalk.green("$&"));
    return coloredKeywords;
}
exports.prettifyQuery = prettifyQuery;
