/**
 * CartMemento.ts - 购物车快照
 * 【Memento 模式】保存购物车状态
 */

import { CartItem } from '../CartItem';

export class CartMemento {
    private readonly state: CartItem[];
    private readonly timestamp: Date;

    constructor(state: CartItem[]) {
        this.state = state;
        this.timestamp = new Date();
    }

    public getState(): CartItem[] {
        return this.state;
    }

    public getTimestamp(): Date {
        return this.timestamp;
    }
}
