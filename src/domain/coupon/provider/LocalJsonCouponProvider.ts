/**
 * LocalJsonCouponProvider.ts - 本地 JSON 优惠券提供者
 * 【Adapter 模式】被适配者（Adaptee）
 * 
 * 返回的数据格式与标准接口不同，需要适配
 */

export interface LocalCouponData {
    coupon_code: string;
    discount_type: string;
    discount_value: number;
    desc: string;
    min_order: number;
}

export class LocalJsonCouponProvider {
    private data: LocalCouponData[] = [
        { coupon_code: 'LOCAL10', discount_type: 'percentage', discount_value: 10, desc: '本地券-9折', min_order: 50 },
        { coupon_code: 'LOCAL50', discount_type: 'amount', discount_value: 50, desc: '本地券-减50', min_order: 200 },
        { coupon_code: 'LOCALSHIP', discount_type: 'free_shipping', discount_value: 0, desc: '本地券-免邮', min_order: 100 }
    ];

    /**
     * 获取本地格式的优惠券数据
     */
    public fetchLocalCoupons(): LocalCouponData[] {
        return this.data;
    }

    /**
     * 根据 code 查找
     */
    public findByCode(code: string): LocalCouponData | undefined {
        return this.data.find(c => c.coupon_code === code);
    }
}
