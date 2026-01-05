/**
 * PriceLine.ts - 价格行（叶子节点）
 * 【Composite 模式】叶子组件
 */

import { PricingNode } from './PricingNode';
import { IPricingVisitor } from '../visitor/IPricingVisitor';

export class PriceLine implements PricingNode {
    private label: string;
    private amount: number;

    constructor(label: string, amount: number) {
        this.label = label;
        this.amount = amount;
    }

    public getLabel(): string {
        return this.label;
    }

    public getAmount(): number {
        return this.amount;
    }

    public isLeaf(): boolean {
        return true;
    }

    public print(indent: number, logger: (msg: string) => void): void {
        const prefix = '  '.repeat(indent);
        const sign = this.amount >= 0 ? '' : '';
        logger(`${prefix}├─ ${this.label}: ${sign}¥${Math.abs(this.amount).toFixed(2)}`);
    }

    public accept(visitor: IPricingVisitor): void {
        visitor.visitLine(this);
    }
}
