/**
 * DomRenderer.ts - DOM 渲染器
 * 【Bridge 模式】具体实现者
 */

import { IRenderer, TreeData } from './IRenderer';

export class DomRenderer implements IRenderer {
    public renderTree(data: TreeData): string {
        return this.renderNodeRecursive(data, 0);
    }

    private renderNodeRecursive(node: TreeData, depth: number): string {
        let html = `<div class="tree-node" style="margin-left: ${depth * 20}px">`;
        html += `<span class="node-label">${node.label}</span>`;

        if (node.children && node.children.length > 0) {
            html += '<div class="node-children">';
            for (const child of node.children) {
                html += this.renderNodeRecursive(child, depth + 1);
            }
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    public renderNode(label: string, depth: number): string {
        return `<div style="margin-left: ${depth * 20}px">${label}</div>`;
    }
}
