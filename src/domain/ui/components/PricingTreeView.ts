/**
 * PricingTreeView.ts - 价格树视图组件
 * 【Bridge 模式】抽象部分
 */

import { IRenderer, TreeData } from '../renderer/IRenderer';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class PricingTreeView {
    private renderer: IRenderer;

    constructor(renderer: IRenderer) {
        this.renderer = renderer;
    }

    public setRenderer(renderer: IRenderer): void {
        this.renderer = renderer;
    }

    public render(data: TreeData): string {
        return this.renderer.renderTree(data);
    }

    public renderToConsole(data: TreeData): void {
        const output = this.renderer.renderTree(data);
        DemoConsole.log('Bridge', output);
    }

    public renderToElement(data: TreeData, container: HTMLElement): void {
        container.innerHTML = this.renderer.renderTree(data);
    }
}
