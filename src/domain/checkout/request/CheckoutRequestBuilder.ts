/**
 * CheckoutRequestBuilder.ts - 结算请求构建器
 * 【Builder 模式】分步构建复杂对象
 */

import { CheckoutRequest, CheckoutItem, MemberLevel } from './CheckoutRequest';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class CheckoutRequestBuilder {
    private request: Partial<CheckoutRequest> = {
        memberLevel: 'None',
        items: [],
        taxStrategy: 'JP',
        shippingStrategy: 'standard',
        roundingStrategy: 'bankers'
    };

    public setCustomerId(id: string): this {
        this.request.customerId = id;
        DemoConsole.log('Builder', `设置客户ID: ${id}`);
        return this;
    }

    public setMemberLevel(level: MemberLevel): this {
        this.request.memberLevel = level;
        DemoConsole.log('Builder', `设置会员等级: ${level}`);
        return this;
    }

    public addItem(item: CheckoutItem): this {
        this.request.items!.push(item);
        DemoConsole.log('Builder', `添加商品: ${item.name} x${item.quantity}`);
        return this;
    }

    public setCouponCode(code: string): this {
        this.request.couponCode = code;
        DemoConsole.log('Builder', `设置优惠券: ${code}`);
        return this;
    }

    public setTaxStrategy(strategy: string): this {
        this.request.taxStrategy = strategy;
        DemoConsole.log('Builder', `设置税策略: ${strategy}`);
        return this;
    }

    public setShippingStrategy(strategy: string): this {
        this.request.shippingStrategy = strategy;
        DemoConsole.log('Builder', `设置运费策略: ${strategy}`);
        return this;
    }

    public setRoundingStrategy(strategy: string): this {
        this.request.roundingStrategy = strategy;
        DemoConsole.log('Builder', `设置舍入策略: ${strategy}`);
        return this;
    }

    public build(): CheckoutRequest {
        DemoConsole.log('Builder', '构建完成');
        return this.request as CheckoutRequest;
    }

    public reset(): this {
        this.request = {
            memberLevel: 'None',
            items: [],
            taxStrategy: 'JP',
            shippingStrategy: 'standard',
            roundingStrategy: 'bankers'
        };
        return this;
    }
}
