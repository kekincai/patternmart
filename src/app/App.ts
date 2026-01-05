/**
 * App.ts - 应用主类
 * 负责初始化所有模块并启动应用
 */

import { Router } from './router/Router';
import { AppConfig } from './config/AppConfig';
import { Logger } from './logging/Logger';
import { DemoConsole } from './demo/DemoConsole';
import { DemoRegistry } from './demo/DemoRegistry';
import { Navbar } from '../domain/ui/components/Navbar';
import { Cart } from '../domain/cart/Cart';
import { ThemeManager } from '../domain/ui/theme/ThemeManager';

export class App {
    private static instance: App | null = null;
    private router: Router;
    private navbar: Navbar | null = null;
    private initialized = false;

    private constructor() {
        this.router = new Router();
    }

    /**
     * 获取 App 单例
     * 【Singleton 模式】
     */
    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    /**
     * 初始化应用
     */
    public init(): void {
        if (this.initialized) {
            return;
        }

        const logger = Logger.getInstance();
        const config = AppConfig.getInstance();

        logger.info('App', '应用初始化开始');
        DemoConsole.log('Singleton', `AppConfig 实例 ID: ${config.getInstanceId()}`);
        DemoConsole.log('Singleton', `Logger 实例 ID: ${logger.getInstanceId()}`);

        // 初始化主题
        ThemeManager.getInstance().applyTheme('light');

        // 初始化购物车（从 LocalStorage 恢复）
        Cart.getInstance().loadFromStorage();

        // 渲染导航栏
        this.navbar = new Navbar();

        // 初始化 Demo 注册表
        DemoRegistry.getInstance().registerAll();

        // 初始化路由
        this.router.init();

        // 渲染 Demo Console
        DemoConsole.render();

        this.initialized = true;
        logger.info('App', '应用初始化完成');
        DemoConsole.log('App', '🚀 PatternMart 已启动！欢迎体验 GoF 23 设计模式');
    }

    /**
     * 获取路由器
     */
    public getRouter(): Router {
        return this.router;
    }

    /**
     * 更新导航栏购物车数量
     */
    public updateCartCount(): void {
        this.navbar?.updateCartCount();
    }
}
