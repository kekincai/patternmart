/**
 * JsonPricingVisitor.ts - JSON 导出访问者
 * 【Visitor 模式】
 */

import { IPricingVisitor } from './IPricingVisitor';
import { PriceLine } from '../tree/PriceLine';
import { PriceGroup } from '../tree/PriceGroup';

interface JsonNode {
    label: string;
    amount: number;
    type: 'line' | 'group';
    children?: JsonNode[];
}

export class JsonPricingVisitor implements IPricingVisitor {
    private stack: JsonNode[][] = [[]];

    public visitLine(line: PriceLine): void {
        const current = this.stack[this.stack.length - 1];
        current.push({
            label: line.getLabel(),
            amount: line.getAmount(),
            type: 'line'
        });
    }

    public visitGroup(_group: PriceGroup): void {
        this.stack.push([]);
    }

    public visitGroupEnd(group: PriceGroup): void {
        const children = this.stack.pop()!;
        const current = this.stack[this.stack.length - 1];
        current.push({
            label: group.getLabel(),
            amount: group.getAmount(),
            type: 'group',
            children
        });
    }

    public getResult(): string {
        return JSON.stringify(this.stack[0], null, 2);
    }
}
