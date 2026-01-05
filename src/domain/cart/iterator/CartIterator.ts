/**
 * CartIterator.ts - 购物车迭代器
 * 【Iterator 模式】提供统一的遍历接口
 */

import { CartItem } from '../CartItem';

export interface IIterator<T> {
    hasNext(): boolean;
    next(): T;
    reset(): void;
}

export class CartIterator implements IIterator<CartItem> {
    private items: CartItem[];
    private position: number = 0;

    constructor(items: CartItem[]) {
        this.items = items;
    }

    public hasNext(): boolean {
        return this.position < this.items.length;
    }

    public next(): CartItem {
        if (!this.hasNext()) {
            throw new Error('No more items');
        }
        return this.items[this.position++];
    }

    public reset(): void {
        this.position = 0;
    }

    public current(): CartItem | undefined {
        return this.items[this.position];
    }
}
