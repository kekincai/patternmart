/**
 * CouponPanel.ts - 优惠券面板组件
 */

import { MOCK_COUPONS } from '../../coupon/Coupon';
import { CouponValidatorProxy } from '../../coupon/proxy/CouponValidatorProxy';
import { CheckoutMediator } from '../mediator/CheckoutMediator';
import { DemoConsole } from '../../../app/demo/DemoConsole';
import { Cart } from '../../cart/Cart';

export class CouponPanel {
    private container: HTMLElement;
    private appliedCoupon: string | null = null;
    private validator = new CouponValidatorProxy();

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'card';
    }

    public render(): HTMLElement {
        this.container.innerHTML = `
      <h3>优惠券</h3>
      <div class="form-group">
        <label class="form-label">选择优惠券</label>
        <select id="coupon-select" class="form-control">
          <option value="">-- 不使用优惠券 --</option>
          ${MOCK_COUPONS.map(c => `
            <option value="${c.code}">${c.code} - ${c.description}</option>
          `).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">或输入券码</label>
        <div class="flex gap-1">
          <input type="text" id="coupon-input" class="form-control" placeholder="输入优惠券码">
          <button id="btn-apply-coupon" class="btn btn-primary">应用</button>
        </div>
      </div>
      <div id="coupon-status" class="mt-1"></div>
    `;

        this.bindEvents();
        return this.container;
    }

    private bindEvents(): void {
        const select = this.container.querySelector('#coupon-select') as HTMLSelectElement;
        const input = this.container.querySelector('#coupon-input') as HTMLInputElement;
        const applyBtn = this.container.querySelector('#btn-apply-coupon') as HTMLButtonElement;

        select.addEventListener('change', () => {
            input.value = select.value;
        });

        applyBtn.addEventListener('click', async () => {
            const code = input.value.trim();
            if (code) {
                await this.applyCoupon(code);
            }
        });
    }

    private async applyCoupon(code: string): Promise<void> {
        const statusEl = this.container.querySelector('#coupon-status')!;
        const amount = Cart.getInstance().getTotalAmount();

        DemoConsole.log('Proxy', `验证优惠券: ${code}`);
        const result = await this.validator.validate(code, amount);

        if (result.valid) {
            this.appliedCoupon = code;
            statusEl.innerHTML = `<span style="color: var(--success-color)">✓ ${result.message}</span>`;
            CheckoutMediator.getInstance().notify('CouponPanel', 'couponApplied', { code });
        } else {
            statusEl.innerHTML = `<span style="color: var(--danger-color)">✗ ${result.message}</span>`;
        }
    }

    public getAppliedCoupon(): string | null {
        return this.appliedCoupon;
    }
}
