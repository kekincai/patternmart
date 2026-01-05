/**
 * TextPricingVisitor.ts - 纯文本导出访问者
 * 【Visitor 模式】
 */

import { IPricingVisitor } from './IPricingVisitor';
import { PriceLine } from '../tree/PriceLine';
import { PriceGroup } from '../tree/PriceGroup';

export class TextPricingVisitor implements IPricingVisitor {
    private text: string = '';
    private depth: number = 0;

    public visitLine(line: PriceLine): void {
        const indent = '  '.repeat(this.depth);
        const sign = line.getAmount() >= 0 ? '+' : '';
        this.text += `${indent}${line.getLabel()}: ${sign}¥${line.getAmount().toFixed(2)}\n`;
    }

    public visitGroup(group: PriceGroup): void {
        const indent = '  '.repeat(this.depth);
        this.text += `${indent}[${group.getLabel()}]\n`;
        this.depth++;
    }

    public visitGroupEnd(group: PriceGroup): void {
        this.depth--;
        const indent = '  '.repeat(this.depth);
        this.text += `${indent}--- 小计: ¥${group.getAmount().toFixed(2)} ---\n`;
    }

    public getResult(): string {
        return this.text;
    }
}
