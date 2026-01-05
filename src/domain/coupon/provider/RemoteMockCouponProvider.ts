/**
 * RemoteMockCouponProvider.ts - 远程 Mock 优惠券提供者
 * 【Adapter 模式】被适配者（Adaptee）
 * 
 * 模拟远程 API 返回的数据格式
 */

export interface RemoteCouponResponse {
    id: string;
    promoCode: string;
    discountPercent?: number;
    discountAmount?: number;
    freeShipping?: boolean;
    label: string;
    minimumPurchase: number;
}

export class RemoteMockCouponProvider {
    private mockData: RemoteCouponResponse[] = [
        { id: 'r1', promoCode: 'REMOTE15', discountPercent: 15, label: '远程券-85折', minimumPurchase: 100 },
        { id: 'r2', promoCode: 'REMOTE40', discountAmount: 40, label: '远程券-减40', minimumPurchase: 150 },
        { id: 'r3', promoCode: 'REMOTEFREE', freeShipping: true, label: '远程券-包邮', minimumPurchase: 80 }
    ];

    /**
     * 模拟异步获取远程数据
     */
    public async fetchRemoteCoupons(): Promise<RemoteCouponResponse[]> {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 100));
        return this.mockData;
    }

    /**
     * 根据 promoCode 查找
     */
    public async findByPromoCode(code: string): Promise<RemoteCouponResponse | undefined> {
        await new Promise(resolve => setTimeout(resolve, 50));
        return this.mockData.find(c => c.promoCode === code);
    }
}
