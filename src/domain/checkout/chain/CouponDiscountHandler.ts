/**
 * CouponDiscountHandler.ts - 优惠券折扣处理器
 * 【Chain of Responsibility 模式】
 */

import { DiscountHandler } from './DiscountHandler';
import { PricingContext } from '../context/PricingContext';
import { MOCK_COUPONS } from '../../coupon/Coupon';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class CouponDiscountHandler extends DiscountHandler {
    protected process(context: PricingContext): void {
        if (!context.couponCode) {
            DemoConsole.log('Chain of Responsibility', '优惠券处理器: 无优惠券，跳过');
            return;
        }

        const coupon = MOCK_COUPONS.find(c => c.code === context.couponCode);
        if (!coupon) {
            DemoConsole.log('Chain of Responsibility', `优惠券处理器: 券码 ${context.couponCode} 无效`);
            return;
        }

        if (coupon.minAmount && context.subtotal < coupon.minAmount) {
            DemoConsole.log('Chain of Responsibility', `优惠券处理器: 未达到最低消费 ¥${coupon.minAmount}`);
            return;
        }

        let discount = 0;
        if (coupon.type === 'percent') {
            discount = context.currentAmount * (coupon.value / 100);
            if (coupon.maxDiscount) {
                discount = Math.min(discount, coupon.maxDiscount);
            }
        } else if (coupon.type === 'fixed') {
            discount = coupon.value;
        }

        context.currentAmount -= discount;
        context.discounts.push({ name: `优惠券(${coupon.code})`, amount: discount });
        DemoConsole.log('Chain of Responsibility', `优惠券处理器: 应用 ${coupon.code}，折扣 ¥${discount.toFixed(2)}`);
    }
}
