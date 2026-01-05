/**
 * RoundUp.ts - 向上取整策略
 * 【Strategy 模式】
 */

import { IRoundingStrategy } from '../IRoundingStrategy';
import { DemoConsole } from '../../../../app/demo/DemoConsole';

export class RoundUp implements IRoundingStrategy {
    public getName(): string {
        return '向上取整';
    }

    public round(value: number): number {
        const rounded = Math.ceil(value * 100) / 100;
        DemoConsole.log('Strategy', `${this.getName()}: ${value} -> ${rounded}`);
        return rounded;
    }
}
