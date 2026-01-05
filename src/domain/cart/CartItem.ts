/**
 * CartItem.ts - 购物车项
 */

import { Product } from '../catalog/Product';

export interface CartItem {
    product: Product;
    quantity: number;
}
