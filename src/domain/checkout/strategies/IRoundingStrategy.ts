/**
 * IRoundingStrategy.ts - 舍入策略接口
 * 【Strategy 模式】
 */

export interface IRoundingStrategy {
    getName(): string;
    round(value: number): number;
}
