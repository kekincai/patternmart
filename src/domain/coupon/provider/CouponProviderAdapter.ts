/**
 * CouponProviderAdapter.ts - 优惠券提供者适配器
 * 【Adapter 模式】将不同格式的数据源适配为统一接口
 */

import { ICouponProvider } from './ICouponProvider';
import { Coupon, CouponType } from '../Coupon';
import { LocalJsonCouponProvider, LocalCouponData } from './LocalJsonCouponProvider';
import { RemoteMockCouponProvider, RemoteCouponResponse } from './RemoteMockCouponProvider';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class CouponProviderAdapter implements ICouponProvider {
    private localProvider?: LocalJsonCouponProvider;
    private remoteProvider?: RemoteMockCouponProvider;

    constructor(provider: LocalJsonCouponProvider | RemoteMockCouponProvider) {
        if (provider instanceof LocalJsonCouponProvider) {
            this.localProvider = provider;
        } else {
            this.remoteProvider = provider;
        }
    }

    public async getCoupons(): Promise<Coupon[]> {
        if (this.localProvider) {
            DemoConsole.log('Adapter', '适配本地数据源格式...');
            const localData = this.localProvider.fetchLocalCoupons();
            return localData.map(d => this.adaptLocalCoupon(d));
        }

        if (this.remoteProvider) {
            DemoConsole.log('Adapter', '适配远程数据源格式...');
            const remoteData = await this.remoteProvider.fetchRemoteCoupons();
            return remoteData.map(d => this.adaptRemoteCoupon(d));
        }

        return [];
    }

    public async getCouponByCode(code: string): Promise<Coupon | null> {
        if (this.localProvider) {
            const data = this.localProvider.findByCode(code);
            return data ? this.adaptLocalCoupon(data) : null;
        }

        if (this.remoteProvider) {
            const data = await this.remoteProvider.findByPromoCode(code);
            return data ? this.adaptRemoteCoupon(data) : null;
        }

        return null;
    }

    /**
     * 适配本地格式
     */
    private adaptLocalCoupon(data: LocalCouponData): Coupon {
        let type: CouponType = 'fixed';
        let value = data.discount_value;

        if (data.discount_type === 'percentage') {
            type = 'percent';
        } else if (data.discount_type === 'free_shipping') {
            type = 'freeShip';
            value = 0;
        }

        return {
            code: data.coupon_code,
            type,
            value,
            description: data.desc,
            minAmount: data.min_order
        };
    }

    /**
     * 适配远程格式
     */
    private adaptRemoteCoupon(data: RemoteCouponResponse): Coupon {
        let type: CouponType = 'fixed';
        let value = 0;

        if (data.discountPercent) {
            type = 'percent';
            value = data.discountPercent;
        } else if (data.discountAmount) {
            type = 'fixed';
            value = data.discountAmount;
        } else if (data.freeShipping) {
            type = 'freeShip';
            value = 0;
        }

        return {
            code: data.promoCode,
            type,
            value,
            description: data.label,
            minAmount: data.minimumPurchase
        };
    }
}
