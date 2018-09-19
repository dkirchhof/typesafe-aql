"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const KEYWORDS = [
    "FOR",
    "IN",
    "FILTER",
    "AND",
    "OR",
    "RETURN",
    "OUTBOUND",
    "INBOUND",
    "ANY",
];
function prettifyQuery(query, spaces = 2) {
    let indentation = 0;
    // dont start with "FILTER" and end with "{", "{,", "(" or "(,"
    const startIndent = (line) => /^(?!FILTER).*[{\(]$/.test(line);
    // dont start with "FILTER" and end with "}", "},", ")" or "),"
    const endIndent = (line) => /^(?!FILTER).*[}\)],?$/.test(line);
    // create an indented string
    const indent = (line) => `${" ".repeat(indentation * spaces)}${line}`;
    const indented = query
        .split("\n")
        .map(line => {
        if (endIndent(line)) {
            indentation--;
        }
        const indentedLine = indent(line);
        if (startIndent(line)) {
            indentation++;
        }
        return indentedLine;
    })
        .join("\n");
    const coloredKeywords = KEYWORDS.reduce((result, keyword) => result.replace(new RegExp(`\\b${keyword}\\b`, "g"), chalk_1.default.blue(keyword)), indented);
    return coloredKeywords;
    // const coloredFieldNames = coloredKeywords.replace(/\w+(?=:)/g, chalk.gray("$&"));
    // return coloredFieldNames;
}
exports.prettifyQuery = prettifyQuery;
