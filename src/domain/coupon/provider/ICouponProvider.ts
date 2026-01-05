/**
 * ICouponProvider.ts - 优惠券提供者接口
 * 【Adapter 模式】目标接口
 */

import { Coupon } from '../Coupon';

export interface ICouponProvider {
    getCoupons(): Promise<Coupon[]>;
    getCouponByCode(code: string): Promise<Coupon | null>;
}
