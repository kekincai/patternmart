/**
 * PricingContext.ts - 定价上下文
 */

import { MemberLevel } from '../request/CheckoutRequest';

export interface PricingContext {
    subtotal: number;
    currentAmount: number;
    couponCode?: string;
    memberLevel: MemberLevel;
    isWeekend: boolean;
    discounts: Array<{ name: string; amount: number }>;
}
