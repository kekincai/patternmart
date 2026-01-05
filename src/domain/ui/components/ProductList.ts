/**
 * ProductList.ts - 商品列表组件
 */

import { Product } from '../../catalog/Product';
import { ProductRepository } from '../../catalog/ProductRepository';
import { Cart } from '../../cart/Cart';
import { CommandManager } from '../../cart/command/CommandManager';
import { AddItemCommand } from '../../cart/command/AddItemCommand';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class ProductList {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'product-grid';
    }

    public render(): HTMLElement {
        const products = ProductRepository.getInstance().getAll();

        this.container.innerHTML = products.map(p => this.renderProduct(p)).join('');

        // 绑定事件
        this.container.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = (e.target as HTMLElement).dataset.productId;
                if (productId) {
                    this.addToCart(productId);
                }
            });
        });

        return this.container;
    }

    private renderProduct(product: Product): string {
        return `
      <div class="card product-card">
        <div class="product-image">${product.icon || '📦'}</div>
        <span class="product-category">${product.category}</span>
        <h3 class="card-title">${product.name}</h3>
        <p class="card-text">${product.description || ''}</p>
        <div class="flex justify-between items-center">
          <span class="product-price">¥${product.price}</span>
          <button class="btn btn-primary btn-add-cart" data-product-id="${product.id}">
            加入购物车
          </button>
        </div>
      </div>
    `;
    }

    private addToCart(productId: string): void {
        const product = ProductRepository.getInstance().getById(productId);
        if (product) {
            const cart = Cart.getInstance();
            const cmd = new AddItemCommand(cart, product, 1);
            CommandManager.getInstance().execute(cmd);
            DemoConsole.log('Observer', `商品 "${product.name}" 已加入购物车`);
        }
    }
}
