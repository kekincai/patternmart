/**
 * PatternsGrid.ts - 模式卡片网格组件
 */

import { DemoRegistry, PatternDemo } from '../../../app/demo/DemoRegistry';

export class PatternsGrid {
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'patterns-grid';
    }

    public render(): HTMLElement {
        const demos = DemoRegistry.getInstance().getAll();

        // 按类型分组
        const creational = demos.filter(d => d.type === 'creational');
        const structural = demos.filter(d => d.type === 'structural');
        const behavioral = demos.filter(d => d.type === 'behavioral');

        this.container.innerHTML = `
      <div style="grid-column: 1 / -1"><h2>创建型模式 (5)</h2></div>
      ${creational.map(d => this.renderCard(d)).join('')}
      <div style="grid-column: 1 / -1"><h2>结构型模式 (7)</h2></div>
      ${structural.map(d => this.renderCard(d)).join('')}
      <div style="grid-column: 1 / -1"><h2>行为型模式 (11)</h2></div>
      ${behavioral.map(d => this.renderCard(d)).join('')}
    `;

        this.bindEvents();
        return this.container;
    }

    private renderCard(demo: PatternDemo): string {
        return `
      <div class="card pattern-card ${demo.type}">
        <span class="pattern-type ${demo.type}">${this.getTypeLabel(demo.type)}</span>
        <h3 class="card-title">${demo.name}</h3>
        <p class="pattern-description">${demo.description}</p>
        <code class="pattern-file">${demo.file}</code>
        <button class="btn btn-primary btn-run-demo" data-pattern="${demo.name}">
          ▶ Run Demo
        </button>
      </div>
    `;
    }

    private getTypeLabel(type: string): string {
        switch (type) {
            case 'creational': return '创建型';
            case 'structural': return '结构型';
            case 'behavioral': return '行为型';
            default: return type;
        }
    }

    private bindEvents(): void {
        this.container.querySelectorAll('.btn-run-demo').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pattern = (e.target as HTMLElement).dataset.pattern;
                if (pattern) {
                    DemoRegistry.getInstance().runDemo(pattern);
                }
            });
        });
    }
}
