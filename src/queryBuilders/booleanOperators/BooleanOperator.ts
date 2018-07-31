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