/**
 * FreeOverXShippingStrategy.ts - 满额免运费策略
 * 【Strategy 模式】
 */

import { IShippingStrategy } from '../IShippingStrategy';
import { DemoConsole } from '../../../../app/demo/DemoConsole';

export class FreeOverXShippingStrategy implements IShippingStrategy {
    private readonly threshold: number;
    private readonly baseFee = 15;

    constructor(threshold: number) {
        this.threshold = threshold;
    }

    public getName(): string {
        return `满${this.threshold}免运费`;
    }

    public calculate(amount: number): number {
        const fee = amount >= this.threshold ? 0 : this.baseFee;
        DemoConsole.log('Strategy', `${this.getName()}: ${amount >= this.threshold ? '免运费' : `¥${fee}`}`);
        return fee;
    }
}
