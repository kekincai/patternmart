/**
 * BankersRounding.ts - 银行家舍入策略
 * 【Strategy 模式】四舍六入五成双
 */

import { IRoundingStrategy } from '../IRoundingStrategy';
import { DemoConsole } from '../../../../app/demo/DemoConsole';

export class BankersRounding implements IRoundingStrategy {
    public getName(): string {
        return '银行家舍入';
    }

    public round(value: number): number {
        const rounded = Math.round(value * 100) / 100;
        DemoConsole.log('Strategy', `${this.getName()}: ${value} -> ${rounded}`);
        return rounded;
    }
}
