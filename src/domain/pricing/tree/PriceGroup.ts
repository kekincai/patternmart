/**
 * PriceGroup.ts - 价格组（组合节点）
 * 【Composite 模式】组合组件
 */

import { PricingNode } from './PricingNode';
import { IPricingVisitor } from '../visitor/IPricingVisitor';

export class PriceGroup implements PricingNode {
    private label: string;
    private children: PricingNode[] = [];

    constructor(label: string) {
        this.label = label;
    }

    public getLabel(): string {
        return this.label;
    }

    public getAmount(): number {
        return this.children.reduce((sum, child) => sum + child.getAmount(), 0);
    }

    public isLeaf(): boolean {
        return false;
    }

    public add(node: PricingNode): void {
        this.children.push(node);
    }

    public remove(node: PricingNode): void {
        const index = this.children.indexOf(node);
        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    public getChildren(): PricingNode[] {
        return this.children;
    }

    public print(indent: number, logger: (msg: string) => void): void {
        const prefix = '  '.repeat(indent);
        logger(`${prefix}📁 ${this.label}`);
        this.children.forEach(child => child.print(indent + 1, logger));
    }

    public accept(visitor: IPricingVisitor): void {
        visitor.visitGroup(this);
        this.children.forEach(child => child.accept(visitor));
        visitor.visitGroupEnd(this);
    }
}
