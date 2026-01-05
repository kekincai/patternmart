/**
 * ITaxStrategy.ts - 税策略接口
 * 【Strategy 模式】
 */

export interface ITaxStrategy {
    getName(): string;
    calculate(amount: number): number;
}
