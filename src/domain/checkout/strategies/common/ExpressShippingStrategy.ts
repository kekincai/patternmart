/**
 * ExpressShippingStrategy.ts - 快递运费策略
 * 【Strategy 模式】
 */

import { IShippingStrategy } from '../IShippingStrategy';
import { DemoConsole } from '../../../../app/demo/DemoConsole';

export class ExpressShippingStrategy implements IShippingStrategy {
    private readonly fee = 25;

    public getName(): string {
        return '快递运费';
    }

    public calculate(_amount: number): number {
        DemoConsole.log('Strategy', `${this.getName()}: ¥${this.fee}`);
        return this.fee;
    }
}
