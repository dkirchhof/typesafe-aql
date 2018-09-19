import chalk from "chalk";

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

export function prettifyQuery(query: string, spaces = 2) {
    let indentation = 0;

    // dont start with "FILTER" and end with "{", "{,", "(" or "(,"
    const startIndent = (line: string) => /^(?!FILTER).*[{\(]$/.test(line);

    // dont start with "FILTER" and end with "}", "},", ")" or "),"
    const endIndent = (line: string) => /^(?!FILTER).*[}\)],?$/.test(line);

    // create an indented string
    const indent = (line: string) => `${" ".repeat(indentation * spaces)}${line}`;

    const indented = query
        .split("\n")
        .map(line => {
            if(endIndent(line)) {
                indentation--;
            }

            const indentedLine = indent(line);
            
            if(startIndent(line)) {
                indentation++;
            }

            return indentedLine;
        })
        .join("\n");

    const coloredKeywords = KEYWORDS.reduce(
        (result, keyword) => result.replace(new RegExp(`\\b${keyword}\\b`, "g"), chalk.blue(keyword)),
        indented
    );

    return coloredKeywords;
    
    // const coloredFieldNames = coloredKeywords.replace(/\w+(?=:)/g, chalk.gray("$&"));
    // return coloredFieldNames;
}