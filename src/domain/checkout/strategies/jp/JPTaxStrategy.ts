/**
 * JPTaxStrategy.ts - 日本消费税策略
 * 【Strategy 模式】
 */

import { ITaxStrategy } from '../ITaxStrategy';
import { DemoConsole } from '../../../../app/demo/DemoConsole';

export class JPTaxStrategy implements ITaxStrategy {
    private readonly rate = 0.1; // 10% 消费税

    public getName(): string {
        return '日本消费税 (10%)';
    }

    public calculate(amount: number): number {
        const tax = amount * this.rate;
        DemoConsole.log('Strategy', `${this.getName()}: ¥${amount} × 10% = ¥${tax.toFixed(2)}`);
        return tax;
    }
}
