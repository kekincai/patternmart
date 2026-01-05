/**
 * PaidState.ts - 已支付状态
 * 【State 模式】
 */

import { OrderState } from './OrderState';
import { Order } from '../Order';
import { ShippedState } from './ShippedState';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class PaidState implements OrderState {
    private order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    public getName(): string {
        return 'Paid';
    }

    public getAvailableActions(): string[] {
        return ['ship'];
    }

    public place(): void {
        DemoConsole.log('State', '订单已经提交过了');
    }

    public pay(): void {
        DemoConsole.log('State', '订单已经支付过了');
    }

    public ship(): void {
        DemoConsole.log('State', '订单已发货');
        this.order.setState(new ShippedState(this.order));
    }

    public cancel(): void {
        DemoConsole.log('State', '已支付订单不能取消，请申请退款');
    }
}
