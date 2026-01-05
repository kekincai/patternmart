/**
 * CheckoutPage.ts - 结算页面
 */

import { CartPanel } from '../components/CartPanel';
import { CouponPanel } from '../components/CouponPanel';
import { Cart } from '../../cart/Cart';
import { CartCaretaker } from '../../cart/memento/CartCaretaker';
import { CommandManager } from '../../cart/command/CommandManager';
import { CheckoutFacade } from '../../checkout/facade/CheckoutFacade';
import { CheckoutMediator } from '../mediator/CheckoutMediator';
import { AppConfig } from '../../../app/config/AppConfig';
import { DemoConsole } from '../../../app/demo/DemoConsole';
import { Tokenizer } from '../../coupon/dsl/Tokenizer';
import { Parser } from '../../coupon/dsl/Parser';
import { Evaluator } from '../../coupon/dsl/Evaluator';
import { PriceLine } from '../../pricing/tree/PriceLine';
import { PriceGroup } from '../../pricing/tree/PriceGroup';
import { HtmlPricingVisitor } from '../../pricing/visitor/HtmlPricingVisitor';
import { JsonPricingVisitor } from '../../pricing/visitor/JsonPricingVisitor';
import { TextPricingVisitor } from '../../pricing/visitor/TextPricingVisitor';
import { MemberLevel } from '../../checkout/request/CheckoutRequest';

export class CheckoutPage {
  private caretaker: CartCaretaker;
  private couponPanel: CouponPanel;

  constructor() {
    this.caretaker = new CartCaretaker(Cart.getInstance());
    this.couponPanel = new CouponPanel();
  }

  public render(): HTMLElement {
    const container = document.createElement('div');
    container.innerHTML = this.getTemplate();

    // 插入组件
    const cartSection = container.querySelector('#cart-section')!;
    cartSection.appendChild(new CartPanel().render());

    const couponSection = container.querySelector('#coupon-section')!;
    couponSection.appendChild(this.couponPanel.render());

    this.bindEvents(container);
    return container;
  }

  private getTemplate(): string {
    const config = AppConfig.getInstance();
    return `
      <h1 class="page-title">💳 结算</h1>
      
      <div class="row">
        <div class="col" id="cart-section"></div>
        <div class="col" id="coupon-section"></div>
      </div>

      <div class="checkout-section">
        <h3>策略选择 (Strategy 模式)</h3>
        <div class="strategy-selectors">
          <div class="form-group">
            <label class="form-label">税策略</label>
            <select id="tax-strategy" class="form-control">
              <option value="JP">日本消费税 (10%)</option>
              <option value="US">美国销售税 (8%)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">运费策略</label>
            <select id="shipping-strategy" class="form-control">
              <option value="standard">标准运费 (¥15)</option>
              <option value="express">快递运费 (¥25)</option>
              <option value="free">满200免运费</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">会员等级</label>
            <select id="member-level" class="form-control">
              <option value="None">普通用户</option>
              <option value="Silver">银卡会员 (5%折扣)</option>
              <option value="Gold">金卡会员 (10%折扣)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="decorator-toggle">
            <input type="checkbox" id="weekend-mode" ${config.get('isWeekendMode') ? 'checked' : ''}>
            模拟周末模式 (活动折扣 5%)
          </label>
        </div>
      </div>

      <div class="checkout-section">
        <h3>DSL 优惠规则 (Interpreter 模式)</h3>
        <div class="form-group">
          <textarea id="dsl-input" class="form-control dsl-input" placeholder="PERCENT 10 IF TOTAL > 200">PERCENT 10 IF TOTAL > 200</textarea>
        </div>
        <button id="btn-parse-dsl" class="btn btn-secondary">解析 DSL</button>
      </div>

      <div class="checkout-section">
        <h3>操作</h3>
        <div class="flex gap-1 flex-wrap">
          <button id="btn-undo" class="btn btn-secondary">↩ Undo</button>
          <button id="btn-redo" class="btn btn-secondary">↪ Redo</button>
          <button id="btn-save-snapshot" class="btn btn-secondary">📸 保存快照</button>
          <button id="btn-restore-snapshot" class="btn btn-secondary">🔄 恢复快照</button>
          <button id="btn-calculate" class="btn btn-primary">🧮 计算总价</button>
        </div>
      </div>

      <div class="checkout-section">
        <h3>价格明细导出 (Visitor 模式)</h3>
        <div class="export-buttons">
          <button id="btn-export-html" class="btn btn-secondary">导出 HTML</button>
          <button id="btn-export-json" class="btn btn-secondary">导出 JSON</button>
          <button id="btn-export-text" class="btn btn-secondary">导出 Text</button>
        </div>
      </div>

      <div class="checkout-section">
        <h3>计算结果</h3>
        <div id="pricing-result" class="pricing-tree"></div>
      </div>
    `;
  }

  private bindEvents(container: HTMLElement): void {
    const cmdManager = CommandManager.getInstance();
    const config = AppConfig.getInstance();
    const mediator = CheckoutMediator.getInstance();

    // Undo/Redo
    container.querySelector('#btn-undo')?.addEventListener('click', () => cmdManager.undo());
    container.querySelector('#btn-redo')?.addEventListener('click', () => cmdManager.redo());

    // Memento
    container.querySelector('#btn-save-snapshot')?.addEventListener('click', () => {
      this.caretaker.save();
    });
    container.querySelector('#btn-restore-snapshot')?.addEventListener('click', () => {
      this.caretaker.restore();
    });

    // 周末模式
    container.querySelector('#weekend-mode')?.addEventListener('change', (e) => {
      const checked = (e.target as HTMLInputElement).checked;
      config.set('isWeekendMode', checked);
      DemoConsole.log('Strategy', `周末模式: ${checked ? '开启' : '关闭'}`);
    });

    // 策略变更通知
    container.querySelector('#tax-strategy')?.addEventListener('change', () => {
      mediator.notify('StrategySelector', 'taxChanged', {});
    });
    container.querySelector('#shipping-strategy')?.addEventListener('change', () => {
      mediator.notify('StrategySelector', 'shippingChanged', {});
    });

    // 计算总价
    container.querySelector('#btn-calculate')?.addEventListener('click', () => {
      this.calculate(container);
    });

    // DSL 解析
    container.querySelector('#btn-parse-dsl')?.addEventListener('click', () => {
      this.parseDSL(container);
    });

    // 导出
    container.querySelector('#btn-export-html')?.addEventListener('click', () => this.exportPricing('html'));
    container.querySelector('#btn-export-json')?.addEventListener('click', () => this.exportPricing('json'));
    container.querySelector('#btn-export-text')?.addEventListener('click', () => this.exportPricing('text'));
  }

  private calculate(container: HTMLElement): void {
    const cart = Cart.getInstance();
    const items = cart.getItems().map(i => ({
      productId: i.product.id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity
    }));

    if (items.length === 0) {
      DemoConsole.log('Facade', '购物车为空');
      return;
    }

    const memberLevel = (container.querySelector('#member-level') as HTMLSelectElement).value as MemberLevel;
    const shippingType = (container.querySelector('#shipping-strategy') as HTMLSelectElement).value as 'standard' | 'express' | 'free';
    const couponCode = this.couponPanel.getAppliedCoupon() || undefined;

    const facade = new CheckoutFacade();
    const result = facade.calculate({ items, memberLevel, couponCode, shippingType });

    // 显示结果
    const resultEl = container.querySelector('#pricing-result')!;
    resultEl.innerHTML = `
      <div>商品小计: ¥${result.subtotal.toFixed(2)}</div>
      ${result.discounts.map(d => `<div style="color: var(--success-color)">${d.name}: -¥${d.amount.toFixed(2)}</div>`).join('')}
      <div>税费: ¥${result.tax.toFixed(2)}</div>
      <div>运费: ¥${result.shipping.toFixed(2)}</div>
      <div class="pricing-total">总计: ¥${result.total.toFixed(2)}</div>
    `;
  }

  private parseDSL(container: HTMLElement): void {
    const dsl = (container.querySelector('#dsl-input') as HTMLTextAreaElement).value;
    if (!dsl.trim()) return;

    try {
      const tokenizer = new Tokenizer(dsl);
      const tokens = tokenizer.tokenize();
      DemoConsole.log('Interpreter', `Tokens: ${tokens.map(t => `${t.type}(${t.value})`).join(' ')}`);

      const parser = new Parser(tokens);
      const ast = parser.parse();
      DemoConsole.log('Interpreter', `AST: ${JSON.stringify(ast)}`);

      const evaluator = new Evaluator();
      const context = { total: Cart.getInstance().getTotalAmount(), shipping: 15 };
      const result = evaluator.evaluate(ast, context);
      DemoConsole.log('Interpreter', `结果: ${JSON.stringify(result)}`);
    } catch (err) {
      DemoConsole.log('Interpreter', `解析错误: ${err}`);
    }
  }

  private exportPricing(format: 'html' | 'json' | 'text'): void {
    const cart = Cart.getInstance();
    const subtotal = cart.getTotalAmount();

    // 构建价格树
    const root = new PriceGroup('订单总计');
    root.add(new PriceLine('商品小计', subtotal));
    root.add(new PriceLine('税费 (10%)', subtotal * 0.1));
    root.add(new PriceLine('运费', 15));

    let visitor;
    switch (format) {
      case 'html':
        visitor = new HtmlPricingVisitor();
        break;
      case 'json':
        visitor = new JsonPricingVisitor();
        break;
      case 'text':
        visitor = new TextPricingVisitor();
        break;
    }

    root.accept(visitor);
    DemoConsole.log('Visitor', `${format.toUpperCase()} 导出:\n${visitor.getResult()}`);
  }
}
