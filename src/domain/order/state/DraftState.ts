/**
 * DraftState.ts - 草稿状态
 * 【State 模式】
 */

import { OrderState } from './OrderState';
import { Order } from '../Order';
import { PlacedState } from './PlacedState';
import { CancelledState } from './CancelledState';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class DraftState implements OrderState {
    private order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public getName(): string {
        return 'Draft';
    }

    public getAvailableActions(): string[] {
        return ['place', 'cancel'];
    }

    public place(): void {
        DemoConsole.log('State', '订单已提交');
        this.order.setState(new PlacedState(this.order));
    }

    public pay(): void {
        DemoConsole.log('State', '草稿状态不能支付，请先提交订单');
    }

    public ship(): void {
        DemoConsole.log('State', '草稿状态不能发货');
    }

    public cancel(): void {
        DemoConsole.log('State', '订单已取消');
        this.order.setState(new CancelledState(this.order));
    }
}
