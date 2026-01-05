/**
 * AddItemCommand.ts - 添加商品命令
 * 【Command 模式】
 */

import { ICommand } from './ICommand';
import { Cart } from '../Cart';
import { Product } from '../../catalog/Product';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class AddItemCommand implements ICommand {
    private cart: Cart;
    private product: Product;
    private quantity: number;

    constructor(cart: Cart, product: Product, quantity: number = 1) {
        this.cart = cart;
        this.product = product;
        this.quantity = quantity;
    }

    public execute(): void {
        this.cart.addItem(this.product, this.quantity);
        DemoConsole.log('Command', `执行: 添加 ${this.product.name} x${this.quantity}`);
    }

    public undo(): void {
        // 撤销时减少相应数量
        const item = this.cart.getItems().find(i => i.product.id === this.product.id);
        if (item) {
            const newQty = item.quantity - this.quantity;
            if (newQty <= 0) {
                this.cart.removeItem(this.product.id);
            } else {
                this.cart.updateQuantity(this.product.id, newQty);
            }
        }
        DemoConsole.log('Command', `撤销: 移除 ${this.product.name} x${this.quantity}`);
    }

    public getDescription(): string {
        return `添加 ${this.product.name} x${this.quantity}`;
    }
}
