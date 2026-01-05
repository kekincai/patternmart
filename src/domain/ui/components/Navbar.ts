/**
 * Navbar.ts - 导航栏组件
 */

import { Cart } from '../../cart/Cart';
import { ThemeManager, ThemeName } from '../theme/ThemeManager';

export class Navbar {
    private element: HTMLElement;

    constructor() {
        this.element = document.createElement('nav');
        this.element.className = 'navbar';
        this.render();
        document.getElementById('app')?.prepend(this.element);

        // 订阅购物车变化
        Cart.getInstance().subscribe(() => this.updateCartCount());
    }

    private render(): void {
        const cart = Cart.getInstance();
        const themeManager = ThemeManager.getInstance();

        this.element.innerHTML = `
      <a href="#/catalog" class="navbar-brand">🛒 PatternMart</a>
      <ul class="navbar-nav">
        <li><a href="#/catalog">商品</a></li>
        <li><a href="#/checkout">结算</a></li>
        <li><a href="#/order">订单</a></li>
        <li><a href="#/patterns">模式</a></li>
      </ul>
      <div class="navbar-cart flex items-center gap-2">
        <select id="theme-select" class="form-control" style="width: auto;">
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="retro">📺 Retro</option>
        </select>
        <a href="#/checkout" class="btn btn-secondary">
          🛒 <span class="cart-count">${cart.getTotalQuantity()}</span>
        </a>
      </div>
    `;

        // 主题切换事件
        const themeSelect = this.element.querySelector('#theme-select') as HTMLSelectElement;
        themeSelect.value = themeManager.getCurrentTheme();
        themeSelect.addEventListener('change', (e) => {
            const theme = (e.target as HTMLSelectElement).value as ThemeName;
            themeManager.applyTheme(theme);
        });
    }

    public updateCartCount(): void {
        const count = Cart.getInstance().getTotalQuantity();
        const countEl = this.element.querySelector('.cart-count');
        if (countEl) {
            countEl.textContent = String(count);
        }
    }
}
