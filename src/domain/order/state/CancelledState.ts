/**
 * CancelledState.ts - 已取消状态
 * 【State 模式】
 */

import { OrderState } from './OrderState';
import { Order } from '../Order';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class CancelledState implements OrderState {
    constructor(_order: Order) {
        // 已取消状态不需要保存订单引用
    }

    public getName(): string {
        return 'Cancelled';
    }

    public getAvailableActions(): string[] {
        return []; // 已取消，无可用操作
    }

    public place(): void {
        DemoConsole.log('State', '已取消订单不能重新提交');
    }

    public pay(): void {
        DemoConsole.log('State', '已取消订单不能支付');
    }

    public ship(): void {
        DemoConsole.log('State', '已取消订单不能发货');
    }

    public cancel(): void {
        DemoConsole.log('State', '订单已经取消了');
    }
}
