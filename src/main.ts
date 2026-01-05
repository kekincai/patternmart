/**
 * PatternMart 应用入口
 * GoF 23 设计模式全覆盖演示
 */

import { App } from './app/App';

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    const app = App.getInstance();
    app.init();
});
