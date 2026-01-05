/**
 * ThresholdDiscountHandler.ts - 满减折扣处理器
 * 【Chain of Responsibility 模式】
 */

import { DiscountHandler } from './DiscountHandler';
import { PricingContext } from '../context/PricingContext';
import { AppConfig } from '../../../app/config/AppConfig';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class ThresholdDiscountHandler extends DiscountHandler {
    protected process(context: PricingContext): void {
        const config = AppConfig.getInstance();
        const { threshold, discount } = config.get('thresholdDiscount');

        if (context.subtotal >= threshold) {
            context.currentAmount -= discount;
            context.discounts.push({ name: `满${threshold}减${discount}`, amount: discount });
            DemoConsole.log('Chain of Responsibility', `满减处理器: 满${threshold}减${discount}，折扣 ¥${discount}`);
        } else {
            DemoConsole.log('Chain of Responsibility', `满减处理器: 未达到 ¥${threshold}，跳过`);
        }
    }
}
