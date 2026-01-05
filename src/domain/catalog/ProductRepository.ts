/**
 * ProductRepository.ts - 商品仓库
 * 【Flyweight 模式】可在此处缓存商品实例
 */

import { Product, MOCK_PRODUCTS, ProductCategory } from './Product';

export class ProductRepository {
    private static instance: ProductRepository | null = null;
    private products: Map<string, Product> = new Map();

    private constructor() {
        // 初始化商品缓存
        MOCK_PRODUCTS.forEach(p => this.products.set(p.id, p));
    }

    public static getInstance(): ProductRepository {
        if (!ProductRepository.instance) {
            ProductRepository.instance = new ProductRepository();
        }
        return ProductRepository.instance;
    }

    /**
     * 获取所有商品
     */
    public getAll(): Product[] {
        return Array.from(this.products.values());
    }

    /**
     * 根据 ID 获取商品
     */
    public getById(id: string): Product | undefined {
        return this.products.get(id);
    }

    /**
     * 根据分类获取商品
     */
    public getByCategory(category: ProductCategory): Product[] {
        return this.getAll().filter(p => p.category === category);
    }

    /**
     * 搜索商品
     */
    public search(keyword: string): Product[] {
        const lower = keyword.toLowerCase();
        return this.getAll().filter(p =>
            p.name.toLowerCase().includes(lower) ||
            p.description?.toLowerCase().includes(lower)
        );
    }
}
