/**
 * OrderState.ts - 订单状态接口
 * 【State 模式】
 */

export interface OrderState {
    getName(): string;
    getAvailableActions(): string[];
    place(): void;
    pay(): void;
    ship(): void;
    cancel(): void;
}
