/**
 * PricingNode.ts - 价格树节点接口
 * 【Composite 模式】组件接口
 */

import { IPricingVisitor } from '../visitor/IPricingVisitor';

export interface PricingNode {
    getLabel(): string;
    getAmount(): number;
    isLeaf(): boolean;
    print(indent: number, logger: (msg: string) => void): void;
    accept(visitor: IPricingVisitor): void;
}
