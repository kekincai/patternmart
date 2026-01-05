/**
 * PricingIterator.ts - 价格树迭代器
 * 【Iterator 模式】
 */

import { PricingNode } from '../tree/PricingNode';
import { PriceGroup } from '../tree/PriceGroup';

export class PricingIterator {
    private nodes: PricingNode[] = [];
    private position: number = 0;

    constructor(root: PricingNode) {
        this.flatten(root);
    }

    private flatten(node: PricingNode): void {
        this.nodes.push(node);
        if (!node.isLeaf()) {
            const group = node as PriceGroup;
            group.getChildren().forEach(child => this.flatten(child));
        }
    }

    public hasNext(): boolean {
        return this.position < this.nodes.length;
    }

    public next(): PricingNode {
        return this.nodes[this.position++];
    }

    public reset(): void {
        this.position = 0;
    }
}
