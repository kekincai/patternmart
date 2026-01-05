/**
 * CouponTemplate.ts - 优惠券模板
 * 【Prototype 模式】通过克隆创建新优惠券
 */

import { CouponType } from '../Coupon';
import { deepClone } from '../../../infra/utils/deepClone';

export interface CouponOptions {
    minAmount?: number;
    maxDiscount?: number;
    expiresAt?: Date;
}

export class CouponTemplate {
    private code: string;
    private type: CouponType;
    private value: number;
    private options: CouponOptions;

    constructor(code: string, type: CouponType, value: number, options: CouponOptions = {}) {
        this.code = code;
        this.type = type;
        this.value = value;
        this.options = options;
    }

    /**
     * 克隆当前模板
     * 【Prototype 模式】
     */
    public clone(): CouponTemplate {
        return new CouponTemplate(
            this.code,
            this.type,
            this.value,
            deepClone(this.options)
        );
    }

    // Getters & Setters
    public getCode(): string { return this.code; }
    public setCode(code: string): void { this.code = code; }

    public getType(): CouponType { return this.type; }
    public setType(type: CouponType): void { this.type = type; }

    public getValue(): number { return this.value; }
    public setValue(value: number): void { this.value = value; }

    public getOptions(): CouponOptions { return this.options; }
    public setOptions(options: CouponOptions): void { this.options = options; }

    /**
     * 转换为 JSON
     */
    public toJSON(): object {
        return {
            code: this.code,
            type: this.type,
            value: this.value,
            options: this.options
        };
    }
}
