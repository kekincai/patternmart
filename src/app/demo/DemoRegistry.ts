/**
 * DemoRegistry.ts - 模式演示注册表
 * 
 * 注册所有 23 个 GoF 设计模式的演示函数
 */

import { DemoConsole } from './DemoConsole';
import { AppConfig } from '../config/AppConfig';
import { Logger } from '../logging/Logger';

export interface PatternDemo {
    name: string;
    type: 'creational' | 'structural' | 'behavioral';
    description: string;
    file: string;
    run: () => void;
}

export class DemoRegistry {
    private static instance: DemoRegistry | null = null;
    private demos: Map<string, PatternDemo> = new Map();

    private constructor() { }

    public static getInstance(): DemoRegistry {
        if (!DemoRegistry.instance) {
            DemoRegistry.instance = new DemoRegistry();
        }
        return DemoRegistry.instance;
    }

    /**
     * 注册所有模式演示
     */
    public registerAll(): void {
        this.registerCreationalPatterns();
        this.registerStructuralPatterns();
        this.registerBehavioralPatterns();
    }

    /**
     * 获取所有演示
     */
    public getAll(): PatternDemo[] {
        return Array.from(this.demos.values());
    }

    /**
     * 运行指定模式的演示
     */
    public runDemo(name: string): void {
        const demo = this.demos.get(name);
        if (demo) {
            demo.run();
        }
    }

    /**
     * 注册创建型模式演示
     */
    private registerCreationalPatterns(): void {
        // Singleton 模式
        this.demos.set('Singleton', {
            name: 'Singleton',
            type: 'creational',
            description: '确保一个类只有一个实例，并提供全局访问点',
            file: 'src/app/config/AppConfig.ts',
            run: () => {
                const config1 = AppConfig.getInstance();
                const config2 = AppConfig.getInstance();
                const logger1 = Logger.getInstance();
                const logger2 = Logger.getInstance();

                DemoConsole.log('Singleton', '=== Singleton 模式演示 ===');
                DemoConsole.log('Singleton', `AppConfig 实例1 ID: ${config1.getInstanceId()}`);
                DemoConsole.log('Singleton', `AppConfig 实例2 ID: ${config2.getInstanceId()}`);
                DemoConsole.log('Singleton', `两次获取是否相同: ${config1 === config2}`);
                DemoConsole.log('Singleton', `Logger 实例1 ID: ${logger1.getInstanceId()}`);
                DemoConsole.log('Singleton', `Logger 实例2 ID: ${logger2.getInstanceId()}`);
                DemoConsole.log('Singleton', `Logger 两次获取是否相同: ${logger1 === logger2}`);
            }
        });

        // Factory Method 模式
        this.demos.set('Factory Method', {
            name: 'Factory Method',
            type: 'creational',
            description: '定义创建对象的接口，让子类决定实例化哪个类',
            file: 'src/domain/coupon/factory/CouponHandlerFactory.ts',
            run: async () => {
                const { CouponHandlerFactory } = await import('../../domain/coupon/factory/CouponHandlerFactory');
                DemoConsole.log('Factory Method', '=== Factory Method 模式演示 ===');

                const types = ['percent', 'fixed', 'freeShip'];
                for (const type of types) {
                    const handler = CouponHandlerFactory.create(type);
                    DemoConsole.log('Factory Method', `创建类型 "${type}" -> ${handler.getName()}`);
                }
            }
        });

        // Abstract Factory 模式
        this.demos.set('Abstract Factory', {
            name: 'Abstract Factory',
            type: 'creational',
            description: '提供创建一系列相关对象的接口，无需指定具体类',
            file: 'src/domain/ui/theme/IThemeFactory.ts',
            run: async () => {
                const { LightThemeFactory } = await import('../../domain/ui/theme/LightThemeFactory');
                const { DarkThemeFactory } = await import('../../domain/ui/theme/DarkThemeFactory');
                const { RetroThemeFactory } = await import('../../domain/ui/theme/RetroThemeFactory');

                DemoConsole.log('Abstract Factory', '=== Abstract Factory 模式演示 ===');

                const factories = [new LightThemeFactory(), new DarkThemeFactory(), new RetroThemeFactory()];
                for (const factory of factories) {
                    const btn = factory.createButton();
                    const card = factory.createCard();
                    DemoConsole.log('Abstract Factory', `${factory.constructor.name}:`);
                    DemoConsole.log('Abstract Factory', `  按钮样式: ${btn.getClassName()}`);
                    DemoConsole.log('Abstract Factory', `  卡片样式: ${card.getClassName()}`);
                }
            }
        });

        // Builder 模式
        this.demos.set('Builder', {
            name: 'Builder',
            type: 'creational',
            description: '将复杂对象的构建与表示分离',
            file: 'src/domain/checkout/request/CheckoutRequestBuilder.ts',
            run: async () => {
                const { CheckoutRequestBuilder } = await import('../../domain/checkout/request/CheckoutRequestBuilder');

                DemoConsole.log('Builder', '=== Builder 模式演示 ===');
                DemoConsole.log('Builder', '开始构建 CheckoutRequest...');

                const builder = new CheckoutRequestBuilder();
                const request = builder
                    .setCustomerId('user_123')
                    .setMemberLevel('Gold')
                    .addItem({ productId: 'p1', name: '商品A', price: 100, quantity: 2 })
                    .addItem({ productId: 'p2', name: '商品B', price: 50, quantity: 1 })
                    .setCouponCode('SAVE10')
                    .setTaxStrategy('JP')
                    .setShippingStrategy('express')
                    .build();

                DemoConsole.log('Builder', `构建完成: ${JSON.stringify(request, null, 2)}`);
            }
        });

        // Prototype 模式
        this.demos.set('Prototype', {
            name: 'Prototype',
            type: 'creational',
            description: '通过复制现有对象来创建新对象',
            file: 'src/domain/coupon/prototype/CouponTemplate.ts',
            run: async () => {
                const { CouponTemplate } = await import('../../domain/coupon/prototype/CouponTemplate');

                DemoConsole.log('Prototype', '=== Prototype 模式演示 ===');

                const template = new CouponTemplate('TEMPLATE', 'percent', 10, { minAmount: 100 });
                DemoConsole.log('Prototype', `原始模板: ${JSON.stringify(template.toJSON())}`);

                const clone1 = template.clone();
                clone1.setCode('CLONE_001');

                const clone2 = template.clone();
                clone2.setCode('CLONE_002');
                clone2.setValue(15);

                DemoConsole.log('Prototype', `克隆1: ${JSON.stringify(clone1.toJSON())}`);
                DemoConsole.log('Prototype', `克隆2: ${JSON.stringify(clone2.toJSON())}`);
                DemoConsole.log('Prototype', `原始模板是否被修改: ${template.getCode() === 'TEMPLATE'}`);
                DemoConsole.log('Prototype', `克隆对象引用不同: ${clone1 !== clone2 && clone1 !== template}`);
            }
        });
    }

    /**
     * 注册结构型模式演示
     */
    private registerStructuralPatterns(): void {
        // Adapter 模式
        this.demos.set('Adapter', {
            name: 'Adapter',
            type: 'structural',
            description: '将一个类的接口转换成客户期望的另一个接口',
            file: 'src/domain/coupon/provider/CouponProviderAdapter.ts',
            run: async () => {
                const { CouponProviderAdapter } = await import('../../domain/coupon/provider/CouponProviderAdapter');
                const { LocalJsonCouponProvider } = await import('../../domain/coupon/provider/LocalJsonCouponProvider');
                const { RemoteMockCouponProvider } = await import('../../domain/coupon/provider/RemoteMockCouponProvider');

                DemoConsole.log('Adapter', '=== Adapter 模式演示 ===');

                const localProvider = new LocalJsonCouponProvider();
                const remoteProvider = new RemoteMockCouponProvider();

                const localAdapter = new CouponProviderAdapter(localProvider);
                const remoteAdapter = new CouponProviderAdapter(remoteProvider);

                DemoConsole.log('Adapter', '本地数据源（原始格式不同）:');
                const localCoupons = await localAdapter.getCoupons();
                localCoupons.forEach(c => DemoConsole.log('Adapter', `  - ${c.code}: ${c.description}`));

                DemoConsole.log('Adapter', '远程数据源（原始格式不同）:');
                const remoteCoupons = await remoteAdapter.getCoupons();
                remoteCoupons.forEach(c => DemoConsole.log('Adapter', `  - ${c.code}: ${c.description}`));

                DemoConsole.log('Adapter', '适配后接口统一，调用方式相同！');
            }
        });

        // Bridge 模式
        this.demos.set('Bridge', {
            name: 'Bridge',
            type: 'structural',
            description: '将抽象部分与实现部分分离，使它们可以独立变化',
            file: 'src/domain/ui/renderer/IRenderer.ts',
            run: async () => {
                const { DomRenderer } = await import('../../domain/ui/renderer/DomRenderer');
                const { ConsoleRenderer } = await import('../../domain/ui/renderer/ConsoleRenderer');
                const { PricingTreeView } = await import('../../domain/ui/components/PricingTreeView');

                DemoConsole.log('Bridge', '=== Bridge 模式演示 ===');

                // 创建一个简单的价格树数据
                const treeData = {
                    label: '订单总计',
                    children: [
                        { label: '商品小计: ¥200' },
                        { label: '折扣: -¥30' },
                        { label: '税费: ¥17' },
                        { label: '运费: ¥10' }
                    ]
                };

                DemoConsole.log('Bridge', '使用 DomRenderer 渲染:');
                const domRenderer = new DomRenderer();
                const view1 = new PricingTreeView(domRenderer);
                view1.renderToConsole(treeData);

                DemoConsole.log('Bridge', '使用 ConsoleRenderer 渲染:');
                const consoleRenderer = new ConsoleRenderer();
                const view2 = new PricingTreeView(consoleRenderer);
                view2.renderToConsole(treeData);

                DemoConsole.log('Bridge', '同一抽象（PricingTreeView）可使用不同实现（Renderer）');
            }
        });

        // Composite 模式
        this.demos.set('Composite', {
            name: 'Composite',
            type: 'structural',
            description: '将对象组合成树形结构以表示"部分-整体"层次',
            file: 'src/domain/pricing/tree/PricingNode.ts',
            run: async () => {
                const { PriceLine } = await import('../../domain/pricing/tree/PriceLine');
                const { PriceGroup } = await import('../../domain/pricing/tree/PriceGroup');

                DemoConsole.log('Composite', '=== Composite 模式演示 ===');

                // 构建价格树
                const subtotal = new PriceLine('商品小计', 500);
                const discount = new PriceLine('优惠券折扣', -50);
                const memberDiscount = new PriceLine('会员折扣', -25);

                const discountGroup = new PriceGroup('折扣明细');
                discountGroup.add(discount);
                discountGroup.add(memberDiscount);

                const tax = new PriceLine('税费(10%)', 42.5);
                const shipping = new PriceLine('运费', 0);

                const root = new PriceGroup('订单总计');
                root.add(subtotal);
                root.add(discountGroup);
                root.add(tax);
                root.add(shipping);

                DemoConsole.log('Composite', '价格树结构:');
                root.print(0, (msg) => DemoConsole.log('Composite', msg));
                DemoConsole.log('Composite', `总金额: ¥${root.getAmount()}`);
            }
        });

        // Decorator 模式
        this.demos.set('Decorator', {
            name: 'Decorator',
            type: 'structural',
            description: '动态地给对象添加额外的职责',
            file: 'src/domain/checkout/decorator/LoggingDecorator.ts',
            run: async () => {
                const { CheckoutPipeline } = await import('../../domain/checkout/pipeline/CheckoutPipeline');
                const { LoggingDecorator } = await import('../../domain/checkout/decorator/LoggingDecorator');
                const { TimingDecorator } = await import('../../domain/checkout/decorator/TimingDecorator');
                const { CachingDecorator } = await import('../../domain/checkout/decorator/CachingDecorator');

                DemoConsole.log('Decorator', '=== Decorator 模式演示 ===');

                const basePipeline = new CheckoutPipeline();

                DemoConsole.log('Decorator', '1. 无装饰器执行:');
                basePipeline.run({ items: [{ price: 100, quantity: 2 }] });

                DemoConsole.log('Decorator', '2. 添加 LoggingDecorator:');
                const logged = new LoggingDecorator(new CheckoutPipeline());
                logged.run({ items: [{ price: 100, quantity: 2 }] });

                DemoConsole.log('Decorator', '3. 添加 TimingDecorator:');
                const timed = new TimingDecorator(new CheckoutPipeline());
                timed.run({ items: [{ price: 100, quantity: 2 }] });

                DemoConsole.log('Decorator', '4. 组合多个装饰器:');
                const decorated = new CachingDecorator(
                    new TimingDecorator(
                        new LoggingDecorator(new CheckoutPipeline())
                    )
                );
                decorated.run({ items: [{ price: 100, quantity: 2 }] });
                DemoConsole.log('Decorator', '再次执行（测试缓存）:');
                decorated.run({ items: [{ price: 100, quantity: 2 }] });
            }
        });

        // Facade 模式
        this.demos.set('Facade', {
            name: 'Facade',
            type: 'structural',
            description: '为子系统中的一组接口提供统一的高层接口',
            file: 'src/domain/checkout/facade/CheckoutFacade.ts',
            run: async () => {
                const { CheckoutFacade } = await import('../../domain/checkout/facade/CheckoutFacade');

                DemoConsole.log('Facade', '=== Facade 模式演示 ===');
                DemoConsole.log('Facade', 'CheckoutFacade 封装了复杂的结算流程:');
                DemoConsole.log('Facade', '  - 价格计算');
                DemoConsole.log('Facade', '  - 折扣链处理');
                DemoConsole.log('Facade', '  - 税费计算');
                DemoConsole.log('Facade', '  - 运费计算');

                const facade = new CheckoutFacade();
                const result = facade.calculate({
                    items: [
                        { productId: 'p1', name: '商品A', price: 150, quantity: 2 },
                        { productId: 'p2', name: '商品B', price: 80, quantity: 1 }
                    ],
                    memberLevel: 'Gold',
                    couponCode: 'SAVE10'
                });

                DemoConsole.log('Facade', `结算结果: ${JSON.stringify(result, null, 2)}`);
                DemoConsole.log('Facade', 'UI 只需调用 facade.calculate()，无需了解内部细节');
            }
        });

        // Flyweight 模式
        this.demos.set('Flyweight', {
            name: 'Flyweight',
            type: 'structural',
            description: '运用共享技术有效地支持大量细粒度对象',
            file: 'src/domain/pricing/money/MoneyFormatterPool.ts',
            run: async () => {
                const { MoneyFormatterPool } = await import('../../domain/pricing/money/MoneyFormatterPool');

                DemoConsole.log('Flyweight', '=== Flyweight 模式演示 ===');

                const pool = MoneyFormatterPool.getInstance();

                DemoConsole.log('Flyweight', '获取格式化器（首次创建）:');
                const f1 = pool.getFormatter('zh-CN', 'CNY');
                DemoConsole.log('Flyweight', `  zh-CN/CNY: ${f1.format(1234.56)}`);

                const f2 = pool.getFormatter('en-US', 'USD');
                DemoConsole.log('Flyweight', `  en-US/USD: ${f2.format(1234.56)}`);

                const f3 = pool.getFormatter('ja-JP', 'JPY');
                DemoConsole.log('Flyweight', `  ja-JP/JPY: ${f3.format(1234)}`);

                DemoConsole.log('Flyweight', '再次获取（复用已有实例）:');
                const f1Again = pool.getFormatter('zh-CN', 'CNY');
                DemoConsole.log('Flyweight', `  zh-CN/CNY 是否复用: ${f1 === f1Again}`);

                const stats = pool.getStats();
                DemoConsole.log('Flyweight', `池统计: 实例数=${stats.size}, 命中率=${(stats.hitRate * 100).toFixed(1)}%`);
            }
        });

        // Proxy 模式
        this.demos.set('Proxy', {
            name: 'Proxy',
            type: 'structural',
            description: '为其他对象提供一种代理以控制对这个对象的访问',
            file: 'src/domain/coupon/proxy/CouponValidatorProxy.ts',
            run: async () => {
                const { CouponValidatorProxy } = await import('../../domain/coupon/proxy/CouponValidatorProxy');

                DemoConsole.log('Proxy', '=== Proxy 模式演示 ===');

                const proxy = new CouponValidatorProxy();

                DemoConsole.log('Proxy', '首次验证优惠券（触发实际校验）:');
                const result1 = await proxy.validate('SAVE10', 200);
                DemoConsole.log('Proxy', `  结果: ${result1.valid ? '有效' : '无效'} - ${result1.message}`);

                DemoConsole.log('Proxy', '再次验证同一优惠券（使用缓存）:');
                const result2 = await proxy.validate('SAVE10', 200);
                DemoConsole.log('Proxy', `  结果: ${result2.valid ? '有效' : '无效'} - ${result2.message}`);

                DemoConsole.log('Proxy', '验证无效优惠券:');
                const result3 = await proxy.validate('INVALID', 100);
                DemoConsole.log('Proxy', `  结果: ${result3.valid ? '有效' : '无效'} - ${result3.message}`);
            }
        });
    }

    /**
     * 注册行为型模式演示
     */
    private registerBehavioralPatterns(): void {
        // Strategy 模式
        this.demos.set('Strategy', {
            name: 'Strategy',
            type: 'behavioral',
            description: '定义一系列算法，把它们封装起来，并使它们可以互换',
            file: 'src/domain/checkout/strategies/ITaxStrategy.ts',
            run: async () => {
                const { JPTaxStrategy } = await import('../../domain/checkout/strategies/jp/JPTaxStrategy');
                const { StandardShippingStrategy } = await import('../../domain/checkout/strategies/common/StandardShippingStrategy');
                const { ExpressShippingStrategy } = await import('../../domain/checkout/strategies/common/ExpressShippingStrategy');
                const { FreeOverXShippingStrategy } = await import('../../domain/checkout/strategies/common/FreeOverXShippingStrategy');

                DemoConsole.log('Strategy', '=== Strategy 模式演示 ===');

                const subtotal = 250;

                DemoConsole.log('Strategy', `商品小计: ¥${subtotal}`);

                // 税策略
                const jpTax = new JPTaxStrategy();
                DemoConsole.log('Strategy', `日本消费税(10%): ¥${jpTax.calculate(subtotal)}`);

                // 运费策略
                const standard = new StandardShippingStrategy();
                const express = new ExpressShippingStrategy();
                const freeOver = new FreeOverXShippingStrategy(200);

                DemoConsole.log('Strategy', `标准运费: ¥${standard.calculate(subtotal)}`);
                DemoConsole.log('Strategy', `快递运费: ¥${express.calculate(subtotal)}`);
                DemoConsole.log('Strategy', `满200免运费: ¥${freeOver.calculate(subtotal)}`);

                DemoConsole.log('Strategy', '策略可在运行时切换，算法独立于使用它的客户端');
            }
        });

        // Chain of Responsibility 模式
        this.demos.set('Chain of Responsibility', {
            name: 'Chain of Responsibility',
            type: 'behavioral',
            description: '使多个对象都有机会处理请求，将对象连成链',
            file: 'src/domain/checkout/chain/DiscountHandler.ts',
            run: async () => {
                const { CouponDiscountHandler } = await import('../../domain/checkout/chain/CouponDiscountHandler');
                const { ThresholdDiscountHandler } = await import('../../domain/checkout/chain/ThresholdDiscountHandler');
                const { MemberDiscountHandler } = await import('../../domain/checkout/chain/MemberDiscountHandler');
                const { CampaignDiscountHandler } = await import('../../domain/checkout/chain/CampaignDiscountHandler');

                DemoConsole.log('Chain of Responsibility', '=== Chain of Responsibility 模式演示 ===');

                // 构建责任链
                const couponHandler = new CouponDiscountHandler();
                const thresholdHandler = new ThresholdDiscountHandler();
                const memberHandler = new MemberDiscountHandler();
                const campaignHandler = new CampaignDiscountHandler();

                couponHandler
                    .setNext(thresholdHandler)
                    .setNext(memberHandler)
                    .setNext(campaignHandler);

                const context = {
                    subtotal: 300,
                    currentAmount: 300,
                    couponCode: 'SAVE10',
                    memberLevel: 'Gold' as const,
                    isWeekend: true,
                    discounts: [] as Array<{ name: string; amount: number }>
                };

                DemoConsole.log('Chain of Responsibility', `初始金额: ¥${context.subtotal}`);
                DemoConsole.log('Chain of Responsibility', '开始处理折扣链...');

                couponHandler.handle(context);

                DemoConsole.log('Chain of Responsibility', '折扣明细:');
                context.discounts.forEach(d => {
                    DemoConsole.log('Chain of Responsibility', `  ${d.name}: -¥${d.amount}`);
                });
                DemoConsole.log('Chain of Responsibility', `最终金额: ¥${context.currentAmount}`);
            }
        });

        // Command 模式
        this.demos.set('Command', {
            name: 'Command',
            type: 'behavioral',
            description: '将请求封装成对象，支持撤销操作',
            file: 'src/domain/cart/command/ICommand.ts',
            run: async () => {
                const { Cart } = await import('../../domain/cart/Cart');
                const { CommandManager } = await import('../../domain/cart/command/CommandManager');
                const { AddItemCommand } = await import('../../domain/cart/command/AddItemCommand');
                const { SetQtyCommand } = await import('../../domain/cart/command/SetQtyCommand');

                DemoConsole.log('Command', '=== Command 模式演示 ===');

                const cart = Cart.getInstance();
                cart.clear();
                const cmdManager = CommandManager.getInstance();
                cmdManager.clear();

                const product = { id: 'demo_p1', name: '演示商品', price: 100, category: 'Tech' as const };

                DemoConsole.log('Command', '执行: 添加商品');
                cmdManager.execute(new AddItemCommand(cart, product, 2));
                DemoConsole.log('Command', `购物车: ${cart.getItems().length} 种商品`);

                DemoConsole.log('Command', '执行: 修改数量为 5');
                cmdManager.execute(new SetQtyCommand(cart, 'demo_p1', 5));
                DemoConsole.log('Command', `数量: ${cart.getItems()[0]?.quantity}`);

                DemoConsole.log('Command', '撤销上一步');
                cmdManager.undo();
                DemoConsole.log('Command', `数量: ${cart.getItems()[0]?.quantity}`);

                DemoConsole.log('Command', '重做');
                cmdManager.redo();
                DemoConsole.log('Command', `数量: ${cart.getItems()[0]?.quantity}`);

                cart.clear();
            }
        });

        // Observer 模式
        this.demos.set('Observer', {
            name: 'Observer',
            type: 'behavioral',
            description: '定义对象间一对多的依赖关系，状态改变时通知所有依赖者',
            file: 'src/domain/cart/Cart.ts',
            run: async () => {
                const { Cart } = await import('../../domain/cart/Cart');

                DemoConsole.log('Observer', '=== Observer 模式演示 ===');

                const cart = Cart.getInstance();
                cart.clear();

                // 添加观察者
                const observer1 = () => DemoConsole.log('Observer', '  [观察者1] 购物车已更新！');
                const observer2 = () => DemoConsole.log('Observer', '  [观察者2] 需要重新计算价格！');

                cart.subscribe(observer1);
                cart.subscribe(observer2);

                DemoConsole.log('Observer', '添加商品到购物车:');
                cart.addItem({ id: 'obs_p1', name: '观察者测试商品', price: 50, category: 'Book' as const }, 1);

                DemoConsole.log('Observer', '修改商品数量:');
                cart.updateQuantity('obs_p1', 3);

                DemoConsole.log('Observer', '移除观察者1后再次修改:');
                cart.unsubscribe(observer1);
                cart.updateQuantity('obs_p1', 5);

                cart.clear();
                cart.unsubscribe(observer2);
            }
        });

        // Iterator 模式
        this.demos.set('Iterator', {
            name: 'Iterator',
            type: 'behavioral',
            description: '提供一种方法顺序访问聚合对象中的元素，而不暴露其内部表示',
            file: 'src/domain/cart/iterator/CartIterator.ts',
            run: async () => {
                const { Cart } = await import('../../domain/cart/Cart');
                const { CartIterator } = await import('../../domain/cart/iterator/CartIterator');

                DemoConsole.log('Iterator', '=== Iterator 模式演示 ===');

                const cart = Cart.getInstance();
                cart.clear();

                cart.addItem({ id: 'it_p1', name: '商品A', price: 100, category: 'Tech' as const }, 2);
                cart.addItem({ id: 'it_p2', name: '商品B', price: 50, category: 'Book' as const }, 3);
                cart.addItem({ id: 'it_p3', name: '商品C', price: 30, category: 'Food' as const }, 1);

                DemoConsole.log('Iterator', '使用迭代器遍历购物车:');
                const iterator = new CartIterator(cart.getItems());

                let index = 1;
                while (iterator.hasNext()) {
                    const item = iterator.next();
                    DemoConsole.log('Iterator', `  ${index++}. ${item.product.name} x${item.quantity} = ¥${item.product.price * item.quantity}`);
                }

                DemoConsole.log('Iterator', '迭代器隐藏了内部数据结构，提供统一的遍历接口');
                cart.clear();
            }
        });

        // Mediator 模式
        this.demos.set('Mediator', {
            name: 'Mediator',
            type: 'behavioral',
            description: '用一个中介对象封装一系列对象交互',
            file: 'src/domain/ui/mediator/CheckoutMediator.ts',
            run: async () => {
                const { CheckoutMediator } = await import('../../domain/ui/mediator/CheckoutMediator');

                DemoConsole.log('Mediator', '=== Mediator 模式演示 ===');

                const mediator = CheckoutMediator.getInstance();

                DemoConsole.log('Mediator', '组件通过中介者通信，而非直接调用:');

                DemoConsole.log('Mediator', '1. CouponPanel 输入优惠券码:');
                mediator.notify('CouponPanel', 'couponApplied', { code: 'SAVE10' });

                DemoConsole.log('Mediator', '2. CartPanel 更新商品数量:');
                mediator.notify('CartPanel', 'quantityChanged', { productId: 'p1', quantity: 3 });

                DemoConsole.log('Mediator', '3. StrategySelector 切换运费策略:');
                mediator.notify('StrategySelector', 'shippingChanged', { strategy: 'express' });

                DemoConsole.log('Mediator', '中介者协调各组件，降低耦合度');
            }
        });

        // Memento 模式
        this.demos.set('Memento', {
            name: 'Memento',
            type: 'behavioral',
            description: '在不破坏封装的前提下，捕获对象的内部状态并保存',
            file: 'src/domain/cart/memento/CartMemento.ts',
            run: async () => {
                const { Cart } = await import('../../domain/cart/Cart');
                const { CartCaretaker } = await import('../../domain/cart/memento/CartCaretaker');

                DemoConsole.log('Memento', '=== Memento 模式演示 ===');

                const cart = Cart.getInstance();
                const caretaker = new CartCaretaker(cart);
                cart.clear();

                cart.addItem({ id: 'mem_p1', name: '商品A', price: 100, category: 'Tech' as const }, 2);
                DemoConsole.log('Memento', `当前购物车: ${cart.getItems().length} 种商品, 数量: ${cart.getTotalQuantity()}`);

                DemoConsole.log('Memento', '保存快照...');
                caretaker.save();

                cart.addItem({ id: 'mem_p2', name: '商品B', price: 50, category: 'Book' as const }, 3);
                cart.updateQuantity('mem_p1', 5);
                DemoConsole.log('Memento', `修改后: ${cart.getItems().length} 种商品, 数量: ${cart.getTotalQuantity()}`);

                DemoConsole.log('Memento', '恢复快照...');
                caretaker.restore();
                DemoConsole.log('Memento', `恢复后: ${cart.getItems().length} 种商品, 数量: ${cart.getTotalQuantity()}`);

                cart.clear();
            }
        });

        // State 模式
        this.demos.set('State', {
            name: 'State',
            type: 'behavioral',
            description: '允许对象在内部状态改变时改变其行为',
            file: 'src/domain/order/state/OrderState.ts',
            run: async () => {
                const { Order } = await import('../../domain/order/Order');

                DemoConsole.log('State', '=== State 模式演示 ===');

                const order = new Order('order_demo_001', [
                    { productId: 'p1', name: '商品A', price: 100, quantity: 2 }
                ], 200);

                DemoConsole.log('State', `初始状态: ${order.getStateName()}`);
                DemoConsole.log('State', `可用操作: ${order.getAvailableActions().join(', ')}`);

                DemoConsole.log('State', '执行: place()');
                order.place();
                DemoConsole.log('State', `当前状态: ${order.getStateName()}`);

                DemoConsole.log('State', '执行: pay()');
                order.pay();
                DemoConsole.log('State', `当前状态: ${order.getStateName()}`);

                DemoConsole.log('State', '执行: ship()');
                order.ship();
                DemoConsole.log('State', `当前状态: ${order.getStateName()}`);

                DemoConsole.log('State', '尝试取消已发货订单:');
                order.cancel();
                DemoConsole.log('State', `当前状态: ${order.getStateName()}`);
            }
        });

        // Template Method 模式
        this.demos.set('Template Method', {
            name: 'Template Method',
            type: 'behavioral',
            description: '定义算法骨架，将某些步骤延迟到子类',
            file: 'src/domain/checkout/pipeline/CheckoutPipeline.ts',
            run: async () => {
                const { CheckoutPipeline } = await import('../../domain/checkout/pipeline/CheckoutPipeline');
                const { PremiumCheckoutPipeline } = await import('../../domain/checkout/pipeline/PremiumCheckoutPipeline');

                DemoConsole.log('Template Method', '=== Template Method 模式演示 ===');

                const request = { items: [{ price: 200, quantity: 2 }], memberLevel: 'Gold' };

                DemoConsole.log('Template Method', '标准结算流程:');
                const standard = new CheckoutPipeline();
                standard.run(request);

                DemoConsole.log('Template Method', '高级会员结算流程（覆盖部分步骤）:');
                const premium = new PremiumCheckoutPipeline();
                premium.run(request);

                DemoConsole.log('Template Method', '模板方法定义了固定流程，子类可覆盖特定步骤');
            }
        });

        // Visitor 模式
        this.demos.set('Visitor', {
            name: 'Visitor',
            type: 'behavioral',
            description: '在不改变元素类的前提下定义作用于元素的新操作',
            file: 'src/domain/pricing/visitor/IPricingVisitor.ts',
            run: async () => {
                const { PriceLine } = await import('../../domain/pricing/tree/PriceLine');
                const { PriceGroup } = await import('../../domain/pricing/tree/PriceGroup');
                const { HtmlPricingVisitor } = await import('../../domain/pricing/visitor/HtmlPricingVisitor');
                const { JsonPricingVisitor } = await import('../../domain/pricing/visitor/JsonPricingVisitor');
                const { TextPricingVisitor } = await import('../../domain/pricing/visitor/TextPricingVisitor');

                DemoConsole.log('Visitor', '=== Visitor 模式演示 ===');

                // 构建价格树
                const root = new PriceGroup('订单总计');
                root.add(new PriceLine('商品小计', 300));
                root.add(new PriceLine('折扣', -30));
                root.add(new PriceLine('税费', 27));
                root.add(new PriceLine('运费', 10));

                DemoConsole.log('Visitor', 'HTML 导出:');
                const htmlVisitor = new HtmlPricingVisitor();
                root.accept(htmlVisitor);
                DemoConsole.log('Visitor', htmlVisitor.getResult().substring(0, 100) + '...');

                DemoConsole.log('Visitor', 'JSON 导出:');
                const jsonVisitor = new JsonPricingVisitor();
                root.accept(jsonVisitor);
                DemoConsole.log('Visitor', jsonVisitor.getResult());

                DemoConsole.log('Visitor', 'Text 导出:');
                const textVisitor = new TextPricingVisitor();
                root.accept(textVisitor);
                DemoConsole.log('Visitor', textVisitor.getResult());
            }
        });

        // Interpreter 模式
        this.demos.set('Interpreter', {
            name: 'Interpreter',
            type: 'behavioral',
            description: '给定一个语言，定义其文法表示，并定义一个解释器',
            file: 'src/domain/coupon/dsl/Parser.ts',
            run: async () => {
                const { Tokenizer } = await import('../../domain/coupon/dsl/Tokenizer');
                const { Parser } = await import('../../domain/coupon/dsl/Parser');
                const { Evaluator } = await import('../../domain/coupon/dsl/Evaluator');

                DemoConsole.log('Interpreter', '=== Interpreter 模式演示 ===');

                const dslExamples = [
                    'PERCENT 10 IF TOTAL > 200',
                    'MINUS 30 IF CATEGORY == "Food"',
                    'FREE_SHIP IF TOTAL > 300'
                ];

                for (const dsl of dslExamples) {
                    DemoConsole.log('Interpreter', `DSL: "${dsl}"`);

                    const tokenizer = new Tokenizer(dsl);
                    const tokens = tokenizer.tokenize();
                    DemoConsole.log('Interpreter', `  Tokens: ${tokens.map(t => t.type).join(', ')}`);

                    const parser = new Parser(tokens);
                    const ast = parser.parse();
                    DemoConsole.log('Interpreter', `  AST: ${ast.type} - ${ast.action}`);

                    const evaluator = new Evaluator();
                    const context = { total: 350, category: 'Food', shipping: 15 };
                    const result = evaluator.evaluate(ast, context);
                    DemoConsole.log('Interpreter', `  执行结果: ${JSON.stringify(result)}`);
                }
            }
        });
    }
}
