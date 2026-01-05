/**
 * ShippedState.ts - 已发货状态
 * 【State 模式】
 */

import { OrderState } from './OrderState';
import { Order } from '../Order';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class ShippedState implements OrderState {
    constructor(_order: Order) {
        // 已发货状态不需要保存订单引用
    }

    public getName(): string {
        return 'Shipped';
    }

    public getAvailableActions(): string[] {
        return []; // 已发货，无可用操作
    }

    public place(): void {
        DemoConsole.log('State', '订单已发货，不能重新提交');
    }

    public pay(): void {
        DemoConsole.log('State', '订单已发货，不需要再支付');
    }

    public ship(): void {
        DemoConsole.log('State', '订单已经发货了');
    }

    public cancel(): void {
        DemoConsole.log('State', '已发货订单不能取消');
    }
}
