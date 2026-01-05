/**
 * SetQtyCommand.ts - 设置数量命令
 * 【Command 模式】
 */

import { ICommand } from './ICommand';
import { Cart } from '../Cart';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class SetQtyCommand implements ICommand {
    private cart: Cart;
    private productId: string;
    private newQuantity: number;
    private oldQuantity: number = 0;

    constructor(cart: Cart, productId: string, newQuantity: number) {
        this.cart = cart;
        this.productId = productId;
        this.newQuantity = newQuantity;
    }

    public execute(): void {
        const item = this.cart.getItems().find(i => i.product.id === this.productId);
        if (item) {
            this.oldQuantity = item.quantity;
            this.cart.updateQuantity(this.productId, this.newQuantity);
            DemoConsole.log('Command', `执行: 修改数量 ${this.oldQuantity} -> ${this.newQuantity}`);
        }
    }

    public undo(): void {
        this.cart.updateQuantity(this.productId, this.oldQuantity);
        DemoConsole.log('Command', `撤销: 恢复数量 ${this.newQuantity} -> ${this.oldQuantity}`);
    }

    public getDescription(): string {
        return `设置数量为 ${this.newQuantity}`;
    }
}
