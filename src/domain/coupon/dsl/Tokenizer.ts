/**
 * Tokenizer.ts - DSL 词法分析器
 * 【Interpreter 模式】将 DSL 字符串转换为 Token 序列
 */

export type TokenType =
    | 'PERCENT' | 'MINUS' | 'FREE_SHIP'
    | 'IF' | 'AND' | 'OR'
    | 'TOTAL' | 'CATEGORY' | 'QUANTITY'
    | 'GT' | 'LT' | 'EQ' | 'GTE' | 'LTE'
    | 'NUMBER' | 'STRING'
    | 'EOF';

export interface Token {
    type: TokenType;
    value: string | number;
}

export class Tokenizer {
    private input: string;
    private position: number = 0;

    constructor(input: string) {
        this.input = input.trim();
    }

    public tokenize(): Token[] {
        const tokens: Token[] = [];

        while (this.position < this.input.length) {
            this.skipWhitespace();
            if (this.position >= this.input.length) break;

            const token = this.nextToken();
            if (token) {
                tokens.push(token);
            }
        }

        tokens.push({ type: 'EOF', value: '' });
        return tokens;
    }

    private skipWhitespace(): void {
        while (this.position < this.input.length && /\s/.test(this.input[this.position])) {
            this.position++;
        }
    }

    private nextToken(): Token | null {
        const char = this.input[this.position];

        // 数字
        if (/\d/.test(char)) {
            return this.readNumber();
        }

        // 字符串
        if (char === '"') {
            return this.readString();
        }

        // 操作符
        if (char === '>') {
            this.position++;
            if (this.input[this.position] === '=') {
                this.position++;
                return { type: 'GTE', value: '>=' };
            }
            return { type: 'GT', value: '>' };
        }

        if (char === '<') {
            this.position++;
            if (this.input[this.position] === '=') {
                this.position++;
                return { type: 'LTE', value: '<=' };
            }
            return { type: 'LT', value: '<' };
        }

        if (char === '=' && this.input[this.position + 1] === '=') {
            this.position += 2;
            return { type: 'EQ', value: '==' };
        }

        // 关键字
        const word = this.readWord();
        if (word) {
            const keywords: Record<string, TokenType> = {
                'PERCENT': 'PERCENT',
                'MINUS': 'MINUS',
                'FREE_SHIP': 'FREE_SHIP',
                'IF': 'IF',
                'AND': 'AND',
                'OR': 'OR',
                'TOTAL': 'TOTAL',
                'CATEGORY': 'CATEGORY',
                'QUANTITY': 'QUANTITY'
            };

            const type = keywords[word.toUpperCase()];
            if (type) {
                return { type, value: word };
            }
        }

        this.position++;
        return null;
    }

    private readNumber(): Token {
        let num = '';
        while (this.position < this.input.length && /[\d.]/.test(this.input[this.position])) {
            num += this.input[this.position++];
        }
        return { type: 'NUMBER', value: parseFloat(num) };
    }

    private readString(): Token {
        this.position++; // skip opening quote
        let str = '';
        while (this.position < this.input.length && this.input[this.position] !== '"') {
            str += this.input[this.position++];
        }
        this.position++; // skip closing quote
        return { type: 'STRING', value: str };
    }

    private readWord(): string {
        let word = '';
        while (this.position < this.input.length && /[a-zA-Z_]/.test(this.input[this.position])) {
            word += this.input[this.position++];
        }
        return word;
    }
}
