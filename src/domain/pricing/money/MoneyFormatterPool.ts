/**
 * MoneyFormatterPool.ts - 货币格式化器池
 * 【Flyweight 模式】缓存格式化器实例
 */

import { DemoConsole } from '../../../app/demo/DemoConsole';

export interface IMoneyFormatter {
    format(amount: number): string;
}

class MoneyFormatter implements IMoneyFormatter {
    private formatter: Intl.NumberFormat;

    constructor(locale: string, currency: string) {
        this.formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        });
    }

    public format(amount: number): string {
        return this.formatter.format(amount);
    }
}

export class MoneyFormatterPool {
    private static instance: MoneyFormatterPool | null = null;
    private pool: Map<string, IMoneyFormatter> = new Map();
    private hits: number = 0;
    private misses: number = 0;

    private constructor() { }

    public static getInstance(): MoneyFormatterPool {
        if (!MoneyFormatterPool.instance) {
            MoneyFormatterPool.instance = new MoneyFormatterPool();
        }
        return MoneyFormatterPool.instance;
    }

    /**
     * 获取格式化器（享元）
     */
    public getFormatter(locale: string, currency: string): IMoneyFormatter {
        const key = `${locale}_${currency}`;

        if (this.pool.has(key)) {
            this.hits++;
            DemoConsole.log('Flyweight', `复用格式化器: ${key}`);
            return this.pool.get(key)!;
        }

        this.misses++;
        DemoConsole.log('Flyweight', `创建新格式化器: ${key}`);
        const formatter = new MoneyFormatter(locale, currency);
        this.pool.set(key, formatter);
        return formatter;
    }

    /**
     * 获取统计信息
     */
    public getStats(): { size: number; hits: number; misses: number; hitRate: number } {
        const total = this.hits + this.misses;
        return {
            size: this.pool.size,
            hits: this.hits,
            misses: this.misses,
            hitRate: total > 0 ? this.hits / total : 0
        };
    }

    /**
     * 清空池
     */
    public clear(): void {
        this.pool.clear();
        this.hits = 0;
        this.misses = 0;
    }
}
