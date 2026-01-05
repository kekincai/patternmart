/**
 * CheckoutPipeline.ts - 结算流水线
 * 【Template Method 模式】定义算法骨架
 */

import { DemoConsole } from '../../../app/demo/DemoConsole';

export interface PipelineRequest {
    items: Array<{ price: number; quantity: number }>;
    memberLevel?: string;
}

export interface PipelineResult {
    subtotal: number;
    discount: number;
    tax: number;
    shipping: number;
    total: number;
}

export interface IPipeline {
    run(request: PipelineRequest): PipelineResult;
}

export class CheckoutPipeline implements IPipeline {
    /**
     * 模板方法：定义固定流程
     */
    public run(request: PipelineRequest): PipelineResult {
        DemoConsole.log('Template Method', '开始执行结算流水线...');

        const subtotal = this.calculateSubtotal(request);
        const discount = this.applyDiscounts(subtotal, request);
        const afterDiscount = subtotal - discount;
        const tax = this.calculateTax(afterDiscount);
        const shipping = this.calculateShipping(afterDiscount);
        const total = this.calculateTotal(afterDiscount, tax, shipping);

        this.onComplete(total);

        return { subtotal, discount, tax, shipping, total };
    }

    protected calculateSubtotal(request: PipelineRequest): number {
        const subtotal = request.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        DemoConsole.log('Template Method', `  步骤1: 计算小计 = ¥${subtotal}`);
        return subtotal;
    }

    protected applyDiscounts(_subtotal: number, _request: PipelineRequest): number {
        const discount = 0;
        DemoConsole.log('Template Method', `  步骤2: 应用折扣 = ¥${discount}`);
        return discount;
    }

    protected calculateTax(amount: number): number {
        const tax = amount * 0.1;
        DemoConsole.log('Template Method', `  步骤3: 计算税费 = ¥${tax.toFixed(2)}`);
        return tax;
    }

    protected calculateShipping(amount: number): number {
        const shipping = amount >= 200 ? 0 : 15;
        DemoConsole.log('Template Method', `  步骤4: 计算运费 = ¥${shipping}`);
        return shipping;
    }

    protected calculateTotal(amount: number, tax: number, shipping: number): number {
        const total = amount + tax + shipping;
        DemoConsole.log('Template Method', `  步骤5: 计算总计 = ¥${total.toFixed(2)}`);
        return total;
    }

    protected onComplete(total: number): void {
        DemoConsole.log('Template Method', `流水线完成，总计: ¥${total.toFixed(2)}`);
    }
}
