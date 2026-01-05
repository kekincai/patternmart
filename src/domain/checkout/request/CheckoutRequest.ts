/**
 * CheckoutRequest.ts - 结算请求
 */

export type MemberLevel = 'None' | 'Silver' | 'Gold';

export interface CheckoutItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

export interface CheckoutRequest {
    customerId?: string;
    memberLevel: MemberLevel;
    items: CheckoutItem[];
    couponCode?: string;
    taxStrategy: string;
    shippingStrategy: string;
    roundingStrategy: string;
}
