/**
 * Cart.ts - 购物车
 * 【Observer 模式】购物车变化时通知所有订阅者
 * 【Singleton 模式】全局唯一购物车实例
 */

import { Product } from '../catalog/Product';
import { CartItem } from './CartItem';
import { CartMemento } from './memento/CartMemento';
import { DemoConsole } from '../../app/demo/DemoConsole';
import { LocalStorageAdapter } from '../../infra/storage/LocalStorageAdapter';

type CartObserver = () => void;

export class Cart {
    private static instance: Cart | null = null;
    private items: CartItem[] = [];
    private observers: CartObserver[] = [];
    private storage = new LocalStorageAdapter();
    private readonly STORAGE_KEY = 'patternmart_cart';

    private constructor() { }

    public static getInstance(): Cart {
        if (!Cart.instance) {
            Cart.instance = new Cart();
        }
        return Cart.instance;
    }

    /**
     * 订阅购物车变化
     */
    public subscribe(observer: CartObserver): void {
        this.observers.push(observer);
    }

    /**
     * 取消订阅
     */
    public unsubscribe(observer: CartObserver): void {
        this.observers = this.observers.filter(o => o !== observer);
    }

    /**
     * 通知所有观察者
     */
    private notify(): void {
        DemoConsole.log('Observer', `购物车变化，通知 ${this.observers.length} 个观察者`);
        this.observers.forEach(o => o());
        this.saveToStorage();
    }

    /**
     * 添加商品到购物车
     */
    public addItem(product: Product, quantity: number = 1): void {
        const existing = this.items.find(item => item.product.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
        this.notify();
    }

    /**
     * 从购物车移除商品
     */
    public removeItem(productId: string): void {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.notify();
    }

    /**
     * 更新商品数量
     */
    public updateQuantity(productId: string, quantity: number): void {
        const item = this.items.find(i => i.product.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.notify();
            }
        }
    }

    /**
     * 清空购物车
     */
    public clear(): void {
        this.items = [];
        this.notify();
    }

    /**
     * 获取所有商品
     */
    public getItems(): CartItem[] {
        return [...this.items];
    }

    /**
     * 获取商品总数
     */
    public getTotalQuantity(): number {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    /**
     * 获取总金额
     */
    public getTotalAmount(): number {
        return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }

    /**
     * 创建快照（Memento）
     */
    public createMemento(): CartMemento {
        return new CartMemento(JSON.parse(JSON.stringify(this.items)));
    }

    /**
     * 从快照恢复（Memento）
     */
    public restoreFromMemento(memento: CartMemento): void {
        this.items = JSON.parse(JSON.stringify(memento.getState()));
        this.notify();
    }

    /**
     * 保存到 LocalStorage
     */
    private saveToStorage(): void {
        this.storage.set(this.STORAGE_KEY, JSON.stringify(this.items));
    }

    /**
     * 从 LocalStorage 加载
     */
    public loadFromStorage(): void {
        const data = this.storage.get(this.STORAGE_KEY);
        if (data) {
            try {
                this.items = JSON.parse(data);
            } catch {
                this.items = [];
            }
        }
    }
}
