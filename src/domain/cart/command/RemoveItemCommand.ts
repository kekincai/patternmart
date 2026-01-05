/**
 * RemoveItemCommand.ts - 移除商品命令
 * 【Command 模式】
 */

import { ICommand } from './ICommand';
import { Cart } from '../Cart';
import { CartItem } from '../CartItem';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class RemoveItemCommand implements ICommand {
    private cart: Cart;
    private productId: string;
    private removedItem: CartItem | null = null;

    constructor(cart: Cart, productId: string) {
        this.cart = cart;
        this.productId = productId;
    }

    public execute(): void {
        // 保存被移除的项以便撤销
        this.removedItem = this.cart.getItems().find(i => i.product.id === this.productId) || null;
        if (this.removedItem) {
            this.cart.removeItem(this.productId);
            DemoConsole.log('Command', `执行: 移除 ${this.removedItem.product.name}`);
        }
    }

    public undo(): void {
        if (this.removedItem) {
            this.cart.addItem(this.removedItem.product, this.removedItem.quantity);
            DemoConsole.log('Command', `撤销: 恢复 ${this.removedItem.product.name} x${this.removedItem.quantity}`);
        }
    }

    public getDescription(): string {
        return `移除商品 ${this.productId}`;
    }
}
