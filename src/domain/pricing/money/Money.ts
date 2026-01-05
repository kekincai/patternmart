/**
 * Money.ts - 货币值对象
 */

export class Money {
    private readonly amount: number;
    private readonly currency: string;

    constructor(amount: number, currency: string = 'CNY') {
        this.amount = amount;
        this.currency = currency;
    }

    public getAmount(): number {
        return this.amount;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public add(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Currency mismatch');
        }
        return new Money(this.amount + other.amount, this.currency);
    }

    public subtract(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Currency mismatch');
        }
        return new Money(this.amount - other.amount, this.currency);
    }

    public multiply(factor: number): Money {
        return new Money(this.amount * factor, this.currency);
    }

    public format(locale: string = 'zh-CN'): string {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: this.currency
        }).format(this.amount);
    }
}
