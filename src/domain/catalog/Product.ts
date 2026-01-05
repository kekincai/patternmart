/**
 * Product.ts - 商品实体
 */

export type ProductCategory = 'Food' | 'Tech' | 'Book';

export interface Product {
    id: string;
    name: string;
    price: number;
    category: ProductCategory;
    description?: string;
    icon?: string;
}

/**
 * Mock 商品数据
 */
export const MOCK_PRODUCTS: Product[] = [
    { id: 'p1', name: '有机苹果', price: 25, category: 'Food', icon: '🍎', description: '新鲜有机红富士苹果' },
    { id: 'p2', name: '进口牛排', price: 128, category: 'Food', icon: '🥩', description: '澳洲和牛M5级' },
    { id: 'p3', name: '手工面包', price: 18, category: 'Food', icon: '🍞', description: '法式全麦面包' },
    { id: 'p4', name: '无线耳机', price: 299, category: 'Tech', icon: '🎧', description: '主动降噪蓝牙耳机' },
    { id: 'p5', name: '机械键盘', price: 459, category: 'Tech', icon: '⌨️', description: '87键红轴机械键盘' },
    { id: 'p6', name: '智能手表', price: 899, category: 'Tech', icon: '⌚', description: '运动健康监测手表' },
    { id: 'p7', name: '移动电源', price: 129, category: 'Tech', icon: '🔋', description: '20000mAh快充移动电源' },
    { id: 'p8', name: '设计模式', price: 89, category: 'Book', icon: '📘', description: 'GoF 设计模式经典著作' },
    { id: 'p9', name: '代码整洁之道', price: 79, category: 'Book', icon: '📗', description: '编写可维护代码的艺术' },
    { id: 'p10', name: '重构', price: 99, category: 'Book', icon: '📙', description: '改善既有代码的设计' },
    { id: 'p11', name: '算法导论', price: 139, category: 'Book', icon: '📕', description: '计算机算法经典教材' },
    { id: 'p12', name: '有机蔬菜礼盒', price: 68, category: 'Food', icon: '🥬', description: '时令有机蔬菜组合' }
];
