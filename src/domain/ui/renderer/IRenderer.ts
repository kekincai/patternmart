/**
 * IRenderer.ts - 渲染器接口
 * 【Bridge 模式】实现者接口
 */

export interface TreeData {
    label: string;
    children?: TreeData[];
}

export interface IRenderer {
    renderTree(data: TreeData): string;
    renderNode(label: string, depth: number): string;
}
