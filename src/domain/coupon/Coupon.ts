/**
 * Coupon.ts - 优惠券实体
 */

export type CouponType = 'percent' | 'fixed' | 'freeShip';

export interface Coupon {
    code: string;
    type: CouponType;
    value: number;
    description: string;
    minAmount?: number;
    maxDiscount?: number;
    expiresAt?: Date;
}

/**
 * Mock 优惠券数据
 */
export const MOCK_COUPONS: Coupon[] = [
    { code: 'SAVE10', type: 'percent', value: 10, description: '全场9折', minAmount: 100 },
    { code: 'MINUS30', type: 'fixed', value: 30, description: '满200减30', minAmount: 200 },
    { code: 'FREESHIP', type: 'freeShip', value: 0, description: '免运费', minAmount: 150 },
    { code: 'VIP20', type: 'percent', value: 20, description: 'VIP专享8折', minAmount: 300, maxDiscount: 100 }
];
