/**
 * CartPanel.ts - 购物车面板组件
 */

import { Cart } from '../../cart/Cart';
import { CommandManager } from '../../cart/command/CommandManager';
import { SetQtyCommand } from '../../cart/command/SetQtyCommand';
import { RemoveItemCommand } from '../../cart/command/RemoveItemCommand';
import { CheckoutMediator } from '../mediator/CheckoutMediator';

export class CartPanel {
    private container: HTMLElement;
    private cart: Cart;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'cart-panel';
        this.cart = Cart.getInstance();

        // 订阅购物车变化
        this.cart.subscribe(() => this.update());
    }

    public render(): HTMLElement {
        this.update();
        return this.container;
    }

    private update(): void {
        const items = this.cart.getItems();

        if (items.length === 0) {
            this.container.innerHTML = '<p class="text-center">购物车是空的</p>';
            return;
        }

        this.container.innerHTML = `
      <h3>购物车</h3>
      ${items.map(item => `
        <div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${item.product.icon || ''} ${item.product.name}</div>
            <div class="cart-item-price">¥${item.product.price} × ${item.quantity}</div>
          </div>
          <div class="cart-item-qty">
            <input type="number" class="form-control qty-input" 
                   value="${item.quantity}" min="1" 
                   data-product-id="${item.product.id}">
            <button class="btn btn-danger btn-sm btn-remove" 
                    data-product-id="${item.product.id}">✕</button>
          </div>
        </div>
      `).join('')}
      <div class="pricing-total">
        小计: ¥${this.cart.getTotalAmount().toFixed(2)}
      </div>
    `;

        this.bindEvents();
    }

    private bindEvents(): void {
        // 数量变更
        this.container.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                const productId = target.dataset.productId!;
                const newQty = parseInt(target.value, 10);

                if (newQty > 0) {
                    const cmd = new SetQtyCommand(this.cart, productId, newQty);
                    CommandManager.getInstance().execute(cmd);
                    CheckoutMediator.getInstance().notify('CartPanel', 'quantityChanged', { productId, quantity: newQty });
                }
            });
        });

        // 移除商品
        this.container.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = (e.target as HTMLElement).dataset.productId!;
                const cmd = new RemoveItemCommand(this.cart, productId);
                CommandManager.getInstance().execute(cmd);
                CheckoutMediator.getInstance().notify('CartPanel', 'quantityChanged', { productId, quantity: 0 });
            });
        });
    }
}
