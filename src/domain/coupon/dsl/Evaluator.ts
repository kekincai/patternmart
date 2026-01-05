/**
 * Evaluator.ts - DSL 求值器
 * 【Interpreter 模式】执行 AST
 */

import { ASTNode } from './AST';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export interface EvalContext {
    total: number;
    category?: string;
    quantity?: number;
    shipping?: number;
}

export interface EvalResult {
    applied: boolean;
    discount: number;
    freeShipping: boolean;
    message: string;
}

export class Evaluator {
    public evaluate(ast: ASTNode, context: EvalContext): EvalResult {
        if (ast.type !== 'Rule') {
            throw new Error('Root node must be a Rule');
        }

        // 检查条件
        if (ast.condition && !this.evalCondition(ast.condition, context)) {
            return { applied: false, discount: 0, freeShipping: false, message: '条件不满足' };
        }

        // 执行动作
        switch (ast.action) {
            case 'PERCENT':
                const percentDiscount = context.total * (ast.value! / 100);
                DemoConsole.log('Interpreter', `应用 ${ast.value}% 折扣: -¥${percentDiscount.toFixed(2)}`);
                return { applied: true, discount: percentDiscount, freeShipping: false, message: `${ast.value}% 折扣` };

            case 'MINUS':
                DemoConsole.log('Interpreter', `应用固定减免: -¥${ast.value}`);
                return { applied: true, discount: ast.value!, freeShipping: false, message: `减 ¥${ast.value}` };

            case 'FREE_SHIP':
                DemoConsole.log('Interpreter', '应用免运费');
                return { applied: true, discount: context.shipping || 0, freeShipping: true, message: '免运费' };

            default:
                return { applied: false, discount: 0, freeShipping: false, message: '未知动作' };
        }
    }

    private evalCondition(node: ASTNode, context: EvalContext): boolean {
        if (node.type === 'BinaryOp') {
            const left = this.evalCondition(node.left!, context);
            const right = this.evalCondition(node.right!, context);

            if (node.operator === 'AND') return left && right;
            if (node.operator === 'OR') return left || right;
            return false;
        }

        if (node.type === 'Condition') {
            const fieldValue = this.getFieldValue(node.field!, context);
            const literal = node.literal!;

            switch (node.operator) {
                case '>': return fieldValue > literal;
                case '<': return fieldValue < literal;
                case '>=': return fieldValue >= literal;
                case '<=': return fieldValue <= literal;
                case '==': return fieldValue === literal;
                default: return false;
            }
        }

        return false;
    }

    private getFieldValue(field: string, context: EvalContext): string | number {
        switch (field) {
            case 'TOTAL': return context.total;
            case 'CATEGORY': return context.category || '';
            case 'QUANTITY': return context.quantity || 0;
            default: return 0;
        }
    }
}
