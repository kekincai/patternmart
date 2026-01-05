/**
 * OrderBuilder.ts - 订单构建器
 * 【Builder 模式】
 */

import { Order, OrderItem } from './Order';
import { DemoConsole } from '../../app/demo/DemoConsole';

export class OrderBuilder {
    private id: string = '';
    private items: OrderItem[] = [];
    private total: number = 0;

    public setId(id: string): this {
        this.id = id;
        DemoConsole.log('Builder', `设置订单ID: ${id}`);
        return this;
    }

    public addItem(item: OrderItem): this {
        this.items.push(item);
        DemoConsole.log('Builder', `添加订单项: ${item.name}`);
        return this;
    }

    public setTotal(total: number): this {
        this.total = total;
        DemoConsole.log('Builder', `设置总金额: ¥${total}`);
        return this;
    }

    public build(): Order {
        if (!this.id) {
            this.id = `order_${Date.now()}`;
        }
        DemoConsole.log('Builder', '订单构建完成');
        return new Order(this.id, this.items, this.total);
    }

    public reset(): this {
        this.id = '';
        this.items = [];
        this.total = 0;
        return this;
    }
}
