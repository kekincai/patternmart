/**
 * CheckoutMediator.ts - 结算中介者
 * 【Mediator 模式】协调组件间通信
 */

import { DemoConsole } from '../../../app/demo/DemoConsole';

export type ComponentName = 'CouponPanel' | 'CartPanel' | 'PricingSummary' | 'StrategySelector';
export type EventType = 'couponApplied' | 'quantityChanged' | 'shippingChanged' | 'taxChanged' | 'recalculate';

export class CheckoutMediator {
    private static instance: CheckoutMediator | null = null;
    private listeners: Map<EventType, Array<(data: unknown) => void>> = new Map();

    private constructor() { }

    public static getInstance(): CheckoutMediator {
        if (!CheckoutMediator.instance) {
            CheckoutMediator.instance = new CheckoutMediator();
        }
        return CheckoutMediator.instance;
    }

    /**
     * 组件通知中介者
     */
    public notify(sender: ComponentName, event: EventType, data?: unknown): void {
        DemoConsole.log('Mediator', `[${sender}] 触发事件: ${event}`);

        // 根据事件类型协调其他组件
        switch (event) {
            case 'couponApplied':
                DemoConsole.log('Mediator', '  -> 通知 PricingSummary 重新计算');
                DemoConsole.log('Mediator', '  -> 通知 CartPanel 更新显示');
                break;
            case 'quantityChanged':
                DemoConsole.log('Mediator', '  -> 通知 PricingSummary 重新计算');
                DemoConsole.log('Mediator', '  -> 通知 CouponPanel 检查优惠券有效性');
                break;
            case 'shippingChanged':
            case 'taxChanged':
                DemoConsole.log('Mediator', '  -> 通知 PricingSummary 重新计算');
                break;
        }

        // 触发监听器
        const handlers = this.listeners.get(event);
        if (handlers) {
            handlers.forEach(h => h(data));
        }
    }

    /**
     * 注册事件监听
     */
    public on(event: EventType, handler: (data: unknown) => void): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(handler);
    }

    /**
     * 移除事件监听
     */
    public off(event: EventType, handler: (data: unknown) => void): void {
        const handlers = this.listeners.get(event);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }
}
