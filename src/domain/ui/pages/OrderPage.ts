/**
 * OrderPage.ts - 订单页面
 */

import { Order } from '../../order/Order';
import { OrderBuilder } from '../../order/OrderBuilder';
import { OrderView } from '../components/OrderView';
import { Cart } from '../../cart/Cart';
import { DemoConsole } from '../../../app/demo/DemoConsole';
import { LocalStorageAdapter } from '../../../infra/storage/LocalStorageAdapter';

export class OrderPage {
    private storage = new LocalStorageAdapter();
    private readonly ORDER_KEY = 'patternmart_order';

    public render(): HTMLElement {
        const container = document.createElement('div');

        container.innerHTML = `
      <h1 class="page-title">📦 订单管理</h1>
      <p class="mb-2">订单状态流转演示 State 模式</p>
      <div class="mb-2">
        <button id="btn-create-order" class="btn btn-primary">从购物车创建订单</button>
        <button id="btn-demo-order" class="btn btn-secondary">创建演示订单</button>
      </div>
      <div id="order-container"></div>
    `;

        const orderContainer = container.querySelector('#order-container')!;
        const orderView = new OrderView();
        orderContainer.appendChild(orderView.render());

        // 尝试加载已有订单
        const savedOrder = this.loadOrder();
        if (savedOrder) {
            orderView.setOrder(savedOrder);
        }

        // 绑定事件
        container.querySelector('#btn-create-order')?.addEventListener('click', () => {
            const order = this.createOrderFromCart();
            if (order) {
                orderView.setOrder(order);
                this.saveOrder(order);
            }
        });

        container.querySelector('#btn-demo-order')?.addEventListener('click', () => {
            const order = this.createDemoOrder();
            orderView.setOrder(order);
            this.saveOrder(order);
        });

        return container;
    }

    private createOrderFromCart(): Order | null {
        const cart = Cart.getInstance();
        const items = cart.getItems();

        if (items.length === 0) {
            DemoConsole.log('Builder', '购物车为空，无法创建订单');
            return null;
        }

        const builder = new OrderBuilder();
        builder.setId(`order_${Date.now()}`);

        let total = 0;
        items.forEach(item => {
            builder.addItem({
                productId: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity
            });
            total += item.product.price * item.quantity;
        });

        builder.setTotal(total);
        const order = builder.build();

        DemoConsole.log('Builder', `订单创建成功: ${order.getId()}`);
        return order;
    }

    private createDemoOrder(): Order {
        const builder = new OrderBuilder();
        const order = builder
            .setId(`demo_${Date.now()}`)
            .addItem({ productId: 'p1', name: '演示商品A', price: 100, quantity: 2 })
            .addItem({ productId: 'p2', name: '演示商品B', price: 50, quantity: 1 })
            .setTotal(250)
            .build();

        DemoConsole.log('Builder', `演示订单创建成功: ${order.getId()}`);
        return order;
    }

    private saveOrder(order: Order): void {
        this.storage.set(this.ORDER_KEY, JSON.stringify(order.toJSON()));
    }

    private loadOrder(): Order | null {
        const data = this.storage.get(this.ORDER_KEY);
        if (!data) return null;

        try {
            const json = JSON.parse(data);
            const order = new Order(json.id, json.items, json.total);
            return order;
        } catch {
            return null;
        }
    }
}
