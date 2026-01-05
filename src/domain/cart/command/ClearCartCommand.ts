/**
 * ClearCartCommand.ts - 清空购物车命令
 * 【Command 模式】
 */

import { ICommand } from './ICommand';
import { Cart } from '../Cart';
import { CartItem } from '../CartItem';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class ClearCartCommand implements ICommand {
    private cart: Cart;
    private savedItems: CartItem[] = [];

    constructor(cart: Cart) {
        this.cart = cart;
    }

    public execute(): void {
        this.savedItems = this.cart.getItems().map(item => ({
            product: { ...item.product },
            quantity: item.quantity
        }));
        this.cart.clear();
        DemoConsole.log('Command', `执行: 清空购物车（保存了 ${this.savedItems.length} 种商品）`);
    }

    public undo(): void {
        this.savedItems.forEach(item => {
            this.cart.addItem(item.product, item.quantity);
        });
        DemoConsole.log('Command', `撤销: 恢复 ${this.savedItems.length} 种商品`);
    }

    public getDescription(): string {
        return '清空购物车';
    }
}
