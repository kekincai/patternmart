/**
 * PlacedState.ts - 已提交状态
 * 【State 模式】
 */

import { OrderState } from './OrderState';
import { Order } from '../Order';
import { PaidState } from './PaidState';
import { CancelledState } from './CancelledState';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class PlacedState implements OrderState {
    private order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public getName(): string {
        return 'Placed';
    }

    public getAvailableActions(): string[] {
        return ['pay', 'cancel'];
    }

    public place(): void {
        DemoConsole.log('State', '订单已经提交过了');
    }

    public pay(): void {
        DemoConsole.log('State', '订单已支付');
        this.order.setState(new PaidState(this.order));
    }

    public ship(): void {
        DemoConsole.log('State', '未支付不能发货');
    }

    public cancel(): void {
        DemoConsole.log('State', '订单已取消');
        this.order.setState(new CancelledState(this.order));
    }
}
