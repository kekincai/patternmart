/**
 * ConsoleRenderer.ts - 控制台渲染器
 * 【Bridge 模式】具体实现者
 */

import { IRenderer, TreeData } from './IRenderer';

export class ConsoleRenderer implements IRenderer {
    public renderTree(data: TreeData): string {
        return this.renderNodeRecursive(data, 0);
    }

    private renderNodeRecursive(node: TreeData, depth: number): string {
        const indent = '  '.repeat(depth);
        const prefix = depth > 0 ? '├─ ' : '';
        let output = `${indent}${prefix}${node.label}\n`;

        if (node.children && node.children.length > 0) {
            for (const child of node.children) {
                output += this.renderNodeRecursive(child, depth + 1);
            }
        }

        return output;
    }

    public renderNode(label: string, depth: number): string {
        const indent = '  '.repeat(depth);
        return `${indent}${label}\n`;
    }
}
