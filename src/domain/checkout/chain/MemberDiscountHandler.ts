/**
 * MemberDiscountHandler.ts - 会员折扣处理器
 * 【Chain of Responsibility 模式】
 */

import { DiscountHandler } from './DiscountHandler';
import { PricingContext } from '../context/PricingContext';
import { AppConfig } from '../../../app/config/AppConfig';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class MemberDiscountHandler extends DiscountHandler {
    protected process(context: PricingContext): void {
        const config = AppConfig.getInstance();
        const memberDiscounts = config.get('memberDiscounts');
        const rate = memberDiscounts[context.memberLevel];

        if (rate > 0) {
            const discount = context.currentAmount * rate;
            context.currentAmount -= discount;
            context.discounts.push({ name: `${context.memberLevel}会员折扣`, amount: discount });
            DemoConsole.log('Chain of Responsibility', `会员处理器: ${context.memberLevel} 会员 ${rate * 100}% 折扣，¥${discount.toFixed(2)}`);
        } else {
            DemoConsole.log('Chain of Responsibility', '会员处理器: 非会员，跳过');
        }
    }
}
