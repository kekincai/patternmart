/**
 * PremiumCheckoutPipeline.ts - 高级会员结算流水线
 * 【Template Method 模式】覆盖部分步骤
 */

import { CheckoutPipeline, PipelineRequest } from './CheckoutPipeline';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class PremiumCheckoutPipeline extends CheckoutPipeline {
    /**
     * 覆盖折扣步骤：高级会员额外 10% 折扣
     */
    protected applyDiscounts(subtotal: number, request: PipelineRequest): number {
        let discount = 0;

        if (request.memberLevel === 'Gold') {
            discount = subtotal * 0.1;
            DemoConsole.log('Template Method', `  步骤2: 高级会员折扣 = ¥${discount.toFixed(2)} (10%)`);
        } else {
            DemoConsole.log('Template Method', `  步骤2: 无会员折扣`);
        }

        return discount;
    }

    /**
     * 覆盖运费步骤：高级会员免运费
     */
    protected calculateShipping(_amount: number): number {
        DemoConsole.log('Template Method', `  步骤4: 高级会员免运费 = ¥0`);
        return 0;
    }

    /**
     * 覆盖完成回调
     */
    protected onComplete(total: number): void {
        DemoConsole.log('Template Method', `🌟 高级会员流水线完成，总计: ¥${total.toFixed(2)}`);
    }
}
