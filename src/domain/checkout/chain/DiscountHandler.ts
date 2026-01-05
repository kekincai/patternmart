/**
 * DiscountHandler.ts - 折扣处理器基类
 * 【Chain of Responsibility 模式】
 */

import { PricingContext } from '../context/PricingContext';

export abstract class DiscountHandler {
    protected next: DiscountHandler | null = null;

    /**
     * 设置下一个处理器
     */
    public setNext(handler: DiscountHandler): DiscountHandler {
        this.next = handler;
        return handler;
    }

    /**
     * 处理请求
     */
    public handle(context: PricingContext): void {
        this.process(context);
        if (this.next) {
            this.next.handle(context);
        }
    }

    /**
     * 具体处理逻辑（子类实现）
     */
    protected abstract process(context: PricingContext): void;
}
