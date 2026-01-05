/**
 * Order.ts - 订单实体
 * 【State 模式】订单状态管理
 */

import { OrderState } from './state/OrderState';
import { DraftState } from './state/DraftState';
import { DemoConsole } from '../../app/demo/DemoConsole';

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export class Order {
    private id: string;
    private items: OrderItem[];
    private total: number;
    private state: OrderState;
    private createdAt: Date;
    private observers: Array<(order: Order) => void> = [];

    constructor(id: string, items: OrderItem[], total: number) {
        this.id = id;
        this.items = items;
        this.total = total;
        this.createdAt = new Date();
        this.state = new DraftState(this);
    }

    // Getters
    public getId(): string { return this.id; }
    public getItems(): OrderItem[] { return this.items; }
    public getTotal(): number { return this.total; }
    public getCreatedAt(): Date { return this.createdAt; }

    /**
     * 设置状态
     */
    public setState(state: OrderState): void {
        DemoConsole.log('State', `订单 ${this.id} 状态变更: ${this.state.getName()} -> ${state.getName()}`);
        this.state = state;
        this.notifyObservers();
    }

    /**
     * 获取当前状态名称
     */
    public getStateName(): string {
        return this.state.getName();
    }

    /**
     * 获取可用操作
     */
    public getAvailableActions(): string[] {
        return this.state.getAvailableActions();
    }

    // 状态转换方法
    public place(): void { this.state.place(); }
    public pay(): void { this.state.pay(); }
    public ship(): void { this.state.ship(); }
    public cancel(): void { this.state.cancel(); }

    /**
     * 订阅订单变化
     */
    public subscribe(observer: (order: Order) => void): void {
        this.observers.push(observer);
    }

    /**
     * 取消订阅
     */
    public unsubscribe(observer: (order: Order) => void): void {
        this.observers = this.observers.filter(o => o !== observer);
    }

    /**
     * 通知观察者
     */
    private notifyObservers(): void {
        this.observers.forEach(o => o(this));
    }

    /**
     * 转换为 JSON
     */
    public toJSON(): object {
        return {
            id: this.id,
            items: this.items,
            total: this.total,
            state: this.state.getName(),
            createdAt: this.createdAt.toISOString()
        };
    }
}
