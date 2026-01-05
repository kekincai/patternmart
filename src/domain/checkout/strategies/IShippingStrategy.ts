/**
 * IShippingStrategy.ts - 运费策略接口
 * 【Strategy 模式】
 */

export interface IShippingStrategy {
    getName(): string;
    calculate(amount: number): number;
}
