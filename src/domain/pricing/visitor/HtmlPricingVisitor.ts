/**
 * HtmlPricingVisitor.ts - HTML 导出访问者
 * 【Visitor 模式】
 */

import { IPricingVisitor } from './IPricingVisitor';
import { PriceLine } from '../tree/PriceLine';
import { PriceGroup } from '../tree/PriceGroup';

export class HtmlPricingVisitor implements IPricingVisitor {
    private html: string = '';
    private depth: number = 0;

    public visitLine(line: PriceLine): void {
        const indent = '  '.repeat(this.depth);
        const cls = line.getAmount() < 0 ? 'discount' : 'normal';
        this.html += `${indent}<li class="${cls}">${line.getLabel()}: ¥${line.getAmount().toFixed(2)}</li>\n`;
    }

    public visitGroup(group: PriceGroup): void {
        const indent = '  '.repeat(this.depth);
        this.html += `${indent}<div class="price-group">\n`;
        this.html += `${indent}  <h4>${group.getLabel()}</h4>\n`;
        this.html += `${indent}  <ul>\n`;
        this.depth++;
    }

    public visitGroupEnd(group: PriceGroup): void {
        this.depth--;
        const indent = '  '.repeat(this.depth);
        this.html += `${indent}  </ul>\n`;
        this.html += `${indent}  <strong>小计: ¥${group.getAmount().toFixed(2)}</strong>\n`;
        this.html += `${indent}</div>\n`;
    }

    public getResult(): string {
        return this.html;
    }
}
