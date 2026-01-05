/**
 * CheckoutFacade.ts - 结算门面
 * 【Facade 模式】为复杂子系统提供简单接口
 */

import { DemoConsole } from '../../../app/demo/DemoConsole';
import { MemberLevel } from '../request/CheckoutRequest';
import { CouponDiscountHandler } from '../chain/CouponDiscountHandler';
import { ThresholdDiscountHandler } from '../chain/ThresholdDiscountHandler';
import { MemberDiscountHandler } from '../chain/MemberDiscountHandler';
import { CampaignDiscountHandler } from '../chain/CampaignDiscountHandler';
import { JPTaxStrategy } from '../strategies/jp/JPTaxStrategy';
import { StandardShippingStrategy } from '../strategies/common/StandardShippingStrategy';
import { ExpressShippingStrategy } from '../strategies/common/ExpressShippingStrategy';
import { FreeOverXShippingStrategy } from '../strategies/common/FreeOverXShippingStrategy';
import { AppConfig } from '../../../app/config/AppConfig';

export interface FacadeRequest {
    items: Array<{ productId: string; name: string; price: number; quantity: number }>;
    memberLevel?: MemberLevel;
    couponCode?: string;
    shippingType?: 'standard' | 'express' | 'free';
}

export interface FacadeResult {
    subtotal: number;
    discounts: Array<{ name: string; amount: number }>;
    tax: number;
    shipping: number;
    total: number;
}

export class CheckoutFacade {
    /**
     * 一站式结算计算
     * 【Facade 模式】封装复杂的内部调用
     */
    public calculate(request: FacadeRequest): FacadeResult {
        DemoConsole.log('Facade', '=== 开始结算计算 ===');

        // 1. 计算商品小计
        const subtotal = request.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        DemoConsole.log('Facade', `1. 商品小计: ¥${subtotal}`);

        // 2. 构建折扣链并处理
        DemoConsole.log('Facade', '2. 处理折扣链...');
        const discountContext = this.processDiscountChain(subtotal, request);

        // 3. 计算税费
        const taxStrategy = new JPTaxStrategy();
        const tax = taxStrategy.calculate(discountContext.currentAmount);
        DemoConsole.log('Facade', `3. 税费计算: ¥${tax}`);

        // 4. 计算运费
        const shipping = this.calculateShipping(request.shippingType, subtotal);
        DemoConsole.log('Facade', `4. 运费计算: ¥${shipping}`);

        // 5. 计算总计
        const total = discountContext.currentAmount + tax + shipping;
        DemoConsole.log('Facade', `5. 订单总计: ¥${total}`);
        DemoConsole.log('Facade', '=== 结算计算完成 ===');

        return {
            subtotal,
            discounts: discountContext.discounts,
            tax,
            shipping,
            total
        };
    }

    private processDiscountChain(subtotal: number, request: FacadeRequest) {
        const config = AppConfig.getInstance();

        // 构建责任链
        const couponHandler = new CouponDiscountHandler();
        const thresholdHandler = new ThresholdDiscountHandler();
        const memberHandler = new MemberDiscountHandler();
        const campaignHandler = new CampaignDiscountHandler();

        couponHandler
            .setNext(thresholdHandler)
            .setNext(memberHandler)
            .setNext(campaignHandler);

        const context = {
            subtotal,
            currentAmount: subtotal,
            couponCode: request.couponCode,
            memberLevel: request.memberLevel || 'None' as const,
            isWeekend: config.get('isWeekendMode'),
            discounts: [] as Array<{ name: string; amount: number }>
        };

        couponHandler.handle(context);
        return context;
    }

    private calculateShipping(type: string | undefined, subtotal: number): number {
        switch (type) {
            case 'express':
                return new ExpressShippingStrategy().calculate(subtotal);
            case 'free':
                return new FreeOverXShippingStrategy(0).calculate(subtotal);
            default:
                return new StandardShippingStrategy().calculate(subtotal);
        }
    }
}
