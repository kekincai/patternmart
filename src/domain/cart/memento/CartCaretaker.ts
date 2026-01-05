/**
 * CartCaretaker.ts - 购物车快照管理器
 * 【Memento 模式】管理快照的保存和恢复
 */

import { Cart } from '../Cart';
import { CartMemento } from './CartMemento';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class CartCaretaker {
    private mementos: CartMemento[] = [];
    private cart: Cart;

    constructor(cart: Cart) {
        this.cart = cart;
    }

    /**
     * 保存当前状态
     */
    public save(): void {
        const memento = this.cart.createMemento();
        this.mementos.push(memento);
        DemoConsole.log('Memento', `保存快照 #${this.mementos.length}，时间: ${memento.getTimestamp().toLocaleTimeString()}`);
    }

    /**
     * 恢复到上一个状态
     */
    public restore(): boolean {
        const memento = this.mementos.pop();
        if (memento) {
            this.cart.restoreFromMemento(memento);
            DemoConsole.log('Memento', `恢复到快照，时间: ${memento.getTimestamp().toLocaleTimeString()}`);
            return true;
        }
        DemoConsole.log('Memento', '没有可恢复的快照');
        return false;
    }

    /**
     * 获取快照数量
     */
    public getSnapshotCount(): number {
        return this.mementos.length;
    }

    /**
     * 清空所有快照
     */
    public clear(): void {
        this.mementos = [];
    }
}
