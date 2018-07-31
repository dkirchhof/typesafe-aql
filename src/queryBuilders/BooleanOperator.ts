export class BooleanOperator {
    private readonly type: string;
    private readonly operands: any[];

    constructor(type: string, ...operands: any[]) {
        this.type = type;
        this.operands = operands;
    }

    toString() {
        return `(${this.operands.join(` ${this.type} `)})`;
    }
}

export function and(...operands: any[]) {
    return new BooleanOperator("AND", ...operands);
}

export function or(...operands: any[]) {
    return new BooleanOperator("OR", ...operands);
}