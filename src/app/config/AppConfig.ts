/**
 * AppConfig.ts - 应用配置单例
 * 【Singleton 模式】
 * 
 * 确保全局只有一个配置实例，所有模块共享同一配置
 */

export interface IAppConfig {
    appName: string;
    version: string;
    currency: string;
    locale: string;
    taxRate: number;
    freeShippingThreshold: number;
    memberDiscounts: {
        None: number;
        Silver: number;
        Gold: number;
    };
    thresholdDiscount: {
        threshold: number;
        discount: number;
    };
    weekendDiscount: number;
    isWeekendMode: boolean; // 模拟周末模式开关
}

export class AppConfig {
    private static instance: AppConfig | null = null;
    private readonly instanceId: string;

    private config: IAppConfig = {
        appName: 'PatternMart',
        version: '1.0.0',
        currency: 'CNY',
        locale: 'zh-CN',
        taxRate: 0.1, // 10% 税率
        freeShippingThreshold: 300,
        memberDiscounts: {
            None: 0,
            Silver: 0.05,  // 5% 折扣
            Gold: 0.1      // 10% 折扣
        },
        thresholdDiscount: {
            threshold: 200,
            discount: 30  // 满200减30
        },
        weekendDiscount: 0.05, // 周末 5% 折扣
        isWeekendMode: false
    };

    private constructor() {
        // 生成唯一实例 ID 用于演示 Singleton
        this.instanceId = `config_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 获取单例实例
     */
    public static getInstance(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }
        return AppConfig.instance;
    }

    /**
     * 获取实例 ID（用于演示 Singleton）
     */
    public getInstanceId(): string {
        return this.instanceId;
    }

    /**
     * 获取配置值
     */
    public get<K extends keyof IAppConfig>(key: K): IAppConfig[K] {
        return this.config[key];
    }

    /**
     * 设置配置值
     */
    public set<K extends keyof IAppConfig>(key: K, value: IAppConfig[K]): void {
        this.config[key] = value;
    }

    /**
     * 获取完整配置
     */
    public getAll(): Readonly<IAppConfig> {
        return { ...this.config };
    }

    /**
     * 切换周末模式
     */
    public toggleWeekendMode(): boolean {
        this.config.isWeekendMode = !this.config.isWeekendMode;
        return this.config.isWeekendMode;
    }
}
