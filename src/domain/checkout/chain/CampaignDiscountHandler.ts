/**
 * CampaignDiscountHandler.ts - 活动折扣处理器
 * 【Chain of Responsibility 模式】
 */

import { DiscountHandler } from './DiscountHandler';
import { PricingContext } from '../context/PricingContext';
import { AppConfig } from '../../../app/config/AppConfig';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class CampaignDiscountHandler extends DiscountHandler {
    protected process(context: PricingContext): void {
        const config = AppConfig.getInstance();
        const weekendRate = config.get('weekendDiscount');

        if (context.isWeekend) {
            const discount = context.currentAmount * weekendRate;
            context.currentAmount -= discount;
            context.discounts.push({ name: '周末活动折扣', amount: discount });
            DemoConsole.log('Chain of Responsibility', `活动处理器: 周末 ${weekendRate * 100}% 折扣，¥${discount.toFixed(2)}`);
        } else {
            DemoConsole.log('Chain of Responsibility', '活动处理器: 非周末，跳过');
        }
    }
}
