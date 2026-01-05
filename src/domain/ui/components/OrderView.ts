/**
 * OrderView.ts - 订单视图组件
 */

import { Order } from '../../order/Order';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class OrderView {
    private container: HTMLElement;
    private order: Order | null = null;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'card';
    }

    public setOrder(order: Order): void {
        this.order = order;
        this.order.subscribe(() => this.update());
        this.update();
    }

    public render(): HTMLElement {
        if (!this.order) {
            this.container.innerHTML = '<p>暂无订单</p>';
        }
        return this.container;
    }

    private update(): void {
        if (!this.order) return;

        const state = this.order.getStateName();
        const actions = this.order.getAvailableActions();

        this.container.innerHTML = `
      <h3>订单详情</h3>
      <p><strong>订单号:</strong> ${this.order.getId()}</p>
      <p><strong>创建时间:</strong> ${this.order.getCreatedAt().toLocaleString()}</p>
      <div class="order-status">
        <span class="status-badge status-${state.toLowerCase()}">${state}</span>
      </div>
      <h4>商品列表</h4>
      <ul>
        ${this.order.getItems().map(item => `
          <li>${item.name} × ${item.quantity} = ¥${(item.price * item.quantity).toFixed(2)}</li>
        `).join('')}
      </ul>
      <p class="pricing-total">总计: ¥${this.order.getTotal().toFixed(2)}</p>
      <div class="order-actions">
        ${actions.includes('place') ? '<button class="btn btn-primary" data-action="place">提交订单</button>' : ''}
        ${actions.includes('pay') ? '<button class="btn btn-success" data-action="pay">支付</button>' : ''}
        ${actions.includes('ship') ? '<button class="btn btn-primary" data-action="ship">发货</button>' : ''}
        ${actions.includes('cancel') ? '<button class="btn btn-danger" data-action="cancel">取消</button>' : ''}
      </div>
    `;

        this.bindEvents();
    }

    private bindEvents(): void {
        this.container.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = (e.target as HTMLElement).dataset.action;
                if (this.order && action) {
                    DemoConsole.log('State', `用户点击: ${action}`);
                    switch (action) {
                        case 'place': this.order.place(); break;
                        case 'pay': this.order.pay(); break;
                        case 'ship': this.order.ship(); break;
                        case 'cancel': this.order.cancel(); break;
                    }
                }
            });
        });
    }
}
