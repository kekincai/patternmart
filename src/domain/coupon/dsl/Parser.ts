/**
 * Parser.ts - DSL 语法分析器
 * 【Interpreter 模式】将 Token 序列解析为 AST
 */

import { Token, TokenType } from './Tokenizer';
import { ASTNode, createRuleNode, createConditionNode } from './AST';

export class Parser {
    private tokens: Token[];
    private position: number = 0;

    constructor(tokens: Token[]) {
        this.tokens = tokens;
    }

    public parse(): ASTNode {
        return this.parseRule();
    }

    private current(): Token {
        return this.tokens[this.position] || { type: 'EOF', value: '' };
    }

    private advance(): Token {
        return this.tokens[this.position++];
    }

    private expect(type: TokenType): Token {
        const token = this.advance();
        if (token.type !== type) {
            throw new Error(`Expected ${type}, got ${token.type}`);
        }
        return token;
    }

    private parseRule(): ASTNode {
        const actionToken = this.advance();
        const action = actionToken.type as string;

        let value = 0;
        if (action !== 'FREE_SHIP') {
            const valueToken = this.expect('NUMBER');
            value = valueToken.value as number;
        }

        let condition: ASTNode | undefined;
        if (this.current().type === 'IF') {
            this.advance(); // consume IF
            condition = this.parseCondition();
        }

        return createRuleNode(action, value, condition);
    }

    private parseCondition(): ASTNode {
        const fieldToken = this.advance();
        const field = fieldToken.type as string;

        const opToken = this.advance();
        const operator = opToken.value as string;

        const valueToken = this.advance();
        const literal = valueToken.value;

        return createConditionNode(field, operator, literal);
    }
}
