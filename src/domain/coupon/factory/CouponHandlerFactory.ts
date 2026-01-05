/**
 * CouponHandlerFactory.ts - 优惠券处理器工厂
 * 【Factory Method 模式】根据类型创建不同的处理器
 */

import { DemoConsole } from '../../../app/demo/DemoConsole';

export interface ICouponHandler {
    getName(): string;
    apply(amount: number, value: number): number;
}

class PercentHandler implements ICouponHandler {
    getName(): string { return 'PercentHandler (百分比折扣)'; }
    apply(amount: number, value: number): number {
        return amount * (1 - value / 100);
    }
}

class FixedHandler implements ICouponHandler {
    getName(): string { return 'FixedHandler (固定金额减免)'; }
    apply(amount: number, value: number): number {
        return Math.max(0, amount - value);
    }
}

class FreeShipHandler implements ICouponHandler {
    getName(): string { return 'FreeShipHandler (免运费)'; }
    apply(amount: number, _value: number): number {
        return amount; // 免运费不影响商品金额
    }
}

export class CouponHandlerFactory {
    /**
     * 根据类型创建处理器
     * 【Factory Method 模式】
     */
    public static create(type: string): ICouponHandler {
        DemoConsole.log('Factory Method', `创建优惠券处理器: ${type}`);

        switch (type) {
            case 'percent':
                return new PercentHandler();
            case 'fixed':
                return new FixedHandler();
            case 'freeShip':
                return new FreeShipHandler();
            default:
                DemoConsole.log('Factory Method', `未知类型 "${type}"，使用默认 FixedHandler`);
                return new FixedHandler();
        }
    }
}
