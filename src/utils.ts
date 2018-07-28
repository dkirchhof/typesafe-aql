import chalk from "chalk";
import { Collection } from "./Collection";
import { Field } from "./Field";

const KEYWORDS = [
    "FOR",
    "IN",
    "RETURN",
    "OUTBOUND",
    "INBOUND",
    "ANY",
];

export function createProxy(collection: Collection, variable: string) {
    return new Proxy(collection, {
        get: (target: any, key) => { 
            if(target[key] instanceof Field) {
                return `${variable}.${key.toString()}`;
            }
            return target[key]; 
        }
    });
}

export function prettifyQuery(query: string, spaces = 2) {
    let indentation = 0;
    
    const indented = query
        .split("\n")
        .map(line => {
            if(line.endsWith("}") || line.endsWith(")")) {
                indentation--;
            }

            const indentedLine = `${" ".repeat(indentation * spaces)}${line}`;
            
            if(line.endsWith("{") || line.endsWith("(")) {
                indentation++;
            }

            return indentedLine;
        })
        .join("\n");

    const coloredKeywords = KEYWORDS.reduce(
        (result, keyword) => result.replace(new RegExp(`\\b${keyword}\\b`, "g"), chalk.blue(keyword)),
        indented
    );

    // const coloredFieldNames = coloredKeywords.replace(/\w+:/g, chalk.green("$&"));

    return coloredKeywords;
}