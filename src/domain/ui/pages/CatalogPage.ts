/**
 * CatalogPage.ts - 商品目录页面
 */

import { ProductList } from '../components/ProductList';

export class CatalogPage {
    public render(): HTMLElement {
        const container = document.createElement('div');

        container.innerHTML = `
      <h1 class="page-title">🛍️ 商品目录</h1>
      <p class="mb-2">点击"加入购物车"触发 Command + Observer 模式</p>
    `;

        const productList = new ProductList();
        container.appendChild(productList.render());

        return container;
    }
}
