/**
 * CouponValidatorProxy.ts - 优惠券验证代理
 * 【Proxy 模式】延迟验证，缓存结果
 */

import { DemoConsole } from '../../../app/demo/DemoConsole';
import { MOCK_COUPONS } from '../Coupon';

export interface ValidationResult {
    valid: boolean;
    message: string;
}

export class CouponValidatorProxy {
    private cache: Map<string, ValidationResult> = new Map();

    /**
     * 验证优惠券
     * 首次验证会触发实际校验（模拟延迟），后续使用缓存
     */
    public async validate(code: string, orderAmount: number): Promise<ValidationResult> {
        const cacheKey = `${code}_${orderAmount}`;

        // 检查缓存
        if (this.cache.has(cacheKey)) {
            DemoConsole.log('Proxy', `缓存命中: ${code}`);
            return this.cache.get(cacheKey)!;
        }

        DemoConsole.log('Proxy', `首次验证 ${code}，执行实际校验...`);

        // 模拟延迟
        await new Promise(resolve => setTimeout(resolve, 200));

        // 实际验证逻辑
        const coupon = MOCK_COUPONS.find(c => c.code === code);

        let result: ValidationResult;
        if (!coupon) {
            result = { valid: false, message: '优惠券不存在' };
        } else if (coupon.minAmount && orderAmount < coupon.minAmount) {
            result = { valid: false, message: `订单金额需满 ¥${coupon.minAmount}` };
        } else {
            result = { valid: true, message: `优惠券有效: ${coupon.description}` };
        }

        // 缓存结果
        this.cache.set(cacheKey, result);
        DemoConsole.log('Proxy', `验证完成，结果已缓存`);

        return result;
    }

    /**
     * 清除缓存
     */
    public clearCache(): void {
        this.cache.clear();
        DemoConsole.log('Proxy', '缓存已清除');
    }
}
