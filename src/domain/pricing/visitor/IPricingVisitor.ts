/**
 * IPricingVisitor.ts - 价格访问者接口
 * 【Visitor 模式】定义访问操作
 */

import { PriceLine } from '../tree/PriceLine';
import { PriceGroup } from '../tree/PriceGroup';

export interface IPricingVisitor {
    visitLine(line: PriceLine): void;
    visitGroup(group: PriceGroup): void;
    visitGroupEnd(group: PriceGroup): void;
    getResult(): string;
}
