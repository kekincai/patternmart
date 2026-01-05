/**
 * AST.ts - 抽象语法树节点
 * 【Interpreter 模式】
 */

export type ASTNodeType = 'Rule' | 'Condition' | 'BinaryOp' | 'Value';

export interface ASTNode {
    type: ASTNodeType;
    action?: string;      // PERCENT, MINUS, FREE_SHIP
    value?: number;       // 折扣值
    condition?: ASTNode;  // 条件节点
    left?: ASTNode;       // 左操作数
    right?: ASTNode;      // 右操作数
    operator?: string;    // 操作符
    field?: string;       // 字段名 (TOTAL, CATEGORY, etc.)
    literal?: string | number; // 字面量值
}

/**
 * 创建规则节点
 */
export function createRuleNode(action: string, value: number, condition?: ASTNode): ASTNode {
    return { type: 'Rule', action, value, condition };
}

/**
 * 创建条件节点
 */
export function createConditionNode(field: string, operator: string, literal: string | number): ASTNode {
    return { type: 'Condition', field, operator, literal };
}

/**
 * 创建二元操作节点
 */
export function createBinaryOpNode(operator: string, left: ASTNode, right: ASTNode): ASTNode {
    return { type: 'BinaryOp', operator, left, right };
}
