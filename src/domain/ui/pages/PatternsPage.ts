/**
 * PatternsPage.ts - 设计模式页面
 */

import { PatternsGrid } from '../components/PatternsGrid';
import { ThemeManager, ThemeName } from '../theme/ThemeManager';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class PatternsPage {
    public render(): HTMLElement {
        const container = document.createElement('div');

        container.innerHTML = `
      <h1 class="page-title">🎨 GoF 23 设计模式</h1>
      <p class="mb-2">点击 "Run Demo" 按钮在右下角 Console 查看输出</p>
      
      <div class="card mb-2">
        <h3>主题切换 (Abstract Factory 模式)</h3>
        <div class="flex gap-1">
          <button class="btn btn-secondary" data-theme="light">☀️ Light</button>
          <button class="btn btn-secondary" data-theme="dark">🌙 Dark</button>
          <button class="btn btn-secondary" data-theme="retro">📺 Retro</button>
        </div>
      </div>
      
      <div id="patterns-container"></div>
    `;

        // 插入模式网格
        const patternsContainer = container.querySelector('#patterns-container')!;
        patternsContainer.appendChild(new PatternsGrid().render());

        // 主题切换事件
        container.querySelectorAll('[data-theme]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = (e.target as HTMLElement).dataset.theme as ThemeName;
                ThemeManager.getInstance().applyTheme(theme);
                DemoConsole.log('Abstract Factory', `主题已切换为: ${theme}`);
            });
        });

        return container;
    }
}
