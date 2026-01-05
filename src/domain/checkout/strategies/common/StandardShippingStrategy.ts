/**
 * StandardShippingStrategy.ts - 标准运费策略
 * 【Strategy 模式】
 */

import { IShippingStrategy } from '../IShippingStrategy';
import { DemoConsole } from '../../../../app/demo/DemoConsole';

export class StandardShippingStrategy implements IShippingStrategy {
    private readonly fee = 15;

    public getName(): string {
        return '标准运费';
    }

    public calculate(_amount: number): number {
        DemoConsole.log('Strategy', `${this.getName()}: ¥${this.fee}`);
        return this.fee;
    }
}
