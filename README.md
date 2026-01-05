# PatternMart - GoF 23 设计模式演示

一个可部署到 GitHub Pages 的静态网站，通过电商场景（商品 → 购物车 → 结算 → 订单）演示 GoF 23 种设计模式。

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 部署到 GitHub Pages
npm run deploy
```

## 📁 项目结构

```
patternmart/
├── src/
│   ├── main.ts                 # 应用入口
│   ├── app/
│   │   ├── App.ts              # 应用主类
│   │   ├── router/Router.ts    # Hash 路由器
│   │   ├── config/AppConfig.ts # 【Singleton】应用配置
│   │   ├── logging/Logger.ts   # 【Singleton】日志记录器
│   │   └── demo/
│   │       ├── DemoConsole.ts  # 全局演示控制台
│   │       └── DemoRegistry.ts # 模式演示注册表
│   ├── domain/
│   │   ├── catalog/            # 商品目录
│   │   ├── cart/               # 购物车（Observer, Command, Iterator, Memento）
│   │   ├── coupon/             # 优惠券（Adapter, Factory, Proxy, Prototype, Interpreter）
│   │   ├── pricing/            # 定价（Composite, Flyweight, Iterator, Visitor）
│   │   ├── checkout/           # 结算（Builder, Facade, Strategy, Chain, Decorator, Template）
│   │   ├── order/              # 订单（Builder, State）
│   │   └── ui/                 # UI 组件（Bridge, Abstract Factory, Mediator）
│   └── infra/                  # 基础设施
└── index.html
```

## 🎨 GoF 23 设计模式映射

### 创建型模式 (5)

| 模式 | 文件路径 | 说明 |
|------|----------|------|
| Singleton | `src/app/config/AppConfig.ts` | 全局配置单例 |
| Factory Method | `src/domain/coupon/factory/CouponHandlerFactory.ts` | 创建优惠券处理器 |
| Abstract Factory | `src/domain/ui/theme/IThemeFactory.ts` | 主题工厂 |
| Builder | `src/domain/checkout/request/CheckoutRequestBuilder.ts` | 构建结算请求 |
| Prototype | `src/domain/coupon/prototype/CouponTemplate.ts` | 克隆优惠券模板 |

### 结构型模式 (7)

| 模式 | 文件路径 | 说明 |
|------|----------|------|
| Adapter | `src/domain/coupon/provider/CouponProviderAdapter.ts` | 适配不同数据源 |
| Bridge | `src/domain/ui/renderer/IRenderer.ts` | 渲染器抽象 |
| Composite | `src/domain/pricing/tree/PricingNode.ts` | 价格树结构 |
| Decorator | `src/domain/checkout/decorator/LoggingDecorator.ts` | 流水线装饰器 |
| Facade | `src/domain/checkout/facade/CheckoutFacade.ts` | 结算门面 |
| Flyweight | `src/domain/pricing/money/MoneyFormatterPool.ts` | 格式化器池 |
| Proxy | `src/domain/coupon/proxy/CouponValidatorProxy.ts` | 优惠券验证代理 |

### 行为型模式 (11)

| 模式 | 文件路径 | 说明 |
|------|----------|------|
| Strategy | `src/domain/checkout/strategies/ITaxStrategy.ts` | 税/运费/舍入策略 |
| Chain of Responsibility | `src/domain/checkout/chain/DiscountHandler.ts` | 折扣处理链 |
| Command | `src/domain/cart/command/ICommand.ts` | 购物车操作命令 |
| Observer | `src/domain/cart/Cart.ts` | 购物车变化通知 |
| Iterator | `src/domain/cart/iterator/CartIterator.ts` | 购物车迭代器 |
| Mediator | `src/domain/ui/mediator/CheckoutMediator.ts` | 组件通信中介 |
| Memento | `src/domain/cart/memento/CartMemento.ts` | 购物车快照 |
| State | `src/domain/order/state/OrderState.ts` | 订单状态机 |
| Template Method | `src/domain/checkout/pipeline/CheckoutPipeline.ts` | 结算流水线 |
| Visitor | `src/domain/pricing/visitor/IPricingVisitor.ts` | 价格树导出 |
| Interpreter | `src/domain/coupon/dsl/Parser.ts` | 优惠券 DSL |

## 📖 页面说明

- `#/catalog` - 商品列表，点击"加入购物车"触发 Command + Observer
- `#/checkout` - 结算页面，包含策略选择、DSL 解析、Undo/Redo、快照等功能
- `#/order` - 订单详情，演示 State 模式的状态流转
- `#/patterns` - 23 个模式卡片，每个都有 "Run Demo" 按钮

## 🎯 如何新增一种优惠券类型

体现开闭原则 (OCP)：

1. 在 `src/domain/coupon/Coupon.ts` 中添加新类型：
```typescript
export type CouponType = 'percent' | 'fixed' | 'freeShip' | 'buyXGetY'; // 新增
```

2. 在 `CouponHandlerFactory.ts` 中添加新处理器：
```typescript
class BuyXGetYHandler implements ICouponHandler {
  getName(): string { return 'BuyXGetYHandler'; }
  apply(amount: number, value: number): number {
    // 实现买X送Y逻辑
    return amount;
  }
}

// 在 create 方法中添加 case
case 'buyXGetY':
  return new BuyXGetYHandler();
```

3. 在 `MOCK_COUPONS` 中添加测试数据：
```typescript
{ code: 'BUY2GET1', type: 'buyXGetY', value: 1, description: '买2送1' }
```

无需修改现有代码，只需扩展！

## 🛠️ 技术栈

- Vite + TypeScript (strict mode)
- 原生 DOM（无 React/Vue/Svelte）
- LocalStorage 持久化
- Hash 路由（支持 GitHub Pages）

## 📝 License

MIT
