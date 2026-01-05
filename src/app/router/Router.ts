/**
 * Router.ts - 简单的 Hash 路由器
 * 
 * 支持 GitHub Pages 部署的 hash 路由实现
 */

import { CatalogPage } from '../../domain/ui/pages/CatalogPage';
import { CheckoutPage } from '../../domain/ui/pages/CheckoutPage';
import { OrderPage } from '../../domain/ui/pages/OrderPage';
import { PatternsPage } from '../../domain/ui/pages/PatternsPage';

type RouteHandler = () => void;

interface Route {
    path: string;
    handler: RouteHandler;
}

export class Router {
    private routes: Route[] = [];
    private contentContainer: HTMLElement | null = null;

    constructor() {
        this.setupRoutes();
    }

    /**
     * 配置路由
     */
    private setupRoutes(): void {
        this.routes = [
            { path: '', handler: () => this.renderPage(CatalogPage) },
            { path: 'catalog', handler: () => this.renderPage(CatalogPage) },
            { path: 'checkout', handler: () => this.renderPage(CheckoutPage) },
            { path: 'order', handler: () => this.renderPage(OrderPage) },
            { path: 'patterns', handler: () => this.renderPage(PatternsPage) }
        ];
    }

    /**
     * 初始化路由器
     */
    public init(): void {
        // 创建内容容器
        this.contentContainer = document.createElement('main');
        this.contentContainer.className = 'main-content';
        document.getElementById('app')?.appendChild(this.contentContainer);

        // 监听 hash 变化
        window.addEventListener('hashchange', () => this.handleRoute());

        // 处理初始路由
        this.handleRoute();
    }

    /**
     * 处理路由变化
     */
    private handleRoute(): void {
        const hash = window.location.hash.slice(2) || 'catalog'; // 移除 #/
        const route = this.routes.find(r => r.path === hash);

        if (route) {
            route.handler();
        } else {
            // 404 - 默认跳转到 catalog
            this.navigate('catalog');
        }

        // 更新导航栏激活状态
        this.updateNavActive(hash);
    }

    /**
     * 渲染页面
     */
    private renderPage(PageClass: new () => { render: () => HTMLElement }): void {
        if (!this.contentContainer) return;

        this.contentContainer.innerHTML = '';
        const page = new PageClass();
        this.contentContainer.appendChild(page.render());
    }

    /**
     * 导航到指定路由
     */
    public navigate(path: string): void {
        window.location.hash = `/${path}`;
    }

    /**
     * 更新导航栏激活状态
     */
    private updateNavActive(currentPath: string): void {
        document.querySelectorAll('.navbar-nav a').forEach(link => {
            const href = link.getAttribute('href')?.slice(2) || '';
            link.classList.toggle('active', href === currentPath);
        });
    }

    /**
     * 获取当前路由
     */
    public getCurrentRoute(): string {
        return window.location.hash.slice(2) || 'catalog';
    }
}
