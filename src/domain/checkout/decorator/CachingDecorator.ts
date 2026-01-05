/**
 * CachingDecorator.ts - 缓存装饰器
 * 【Decorator 模式】
 */

import { IPipeline, PipelineRequest, PipelineResult } from '../pipeline/CheckoutPipeline';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class CachingDecorator implements IPipeline {
    private wrapped: IPipeline;
    private cache: Map<string, PipelineResult> = new Map();

    constructor(pipeline: IPipeline) {
        this.wrapped = pipeline;
    }

    public run(request: PipelineRequest): PipelineResult {
        const key = JSON.stringify(request);

        if (this.cache.has(key)) {
            DemoConsole.log('Decorator', '[CachingDecorator] 缓存命中！');
            return this.cache.get(key)!;
        }

        DemoConsole.log('Decorator', '[CachingDecorator] 缓存未命中，执行计算...');
        const result = this.wrapped.run(request);
        this.cache.set(key, result);
        DemoConsole.log('Decorator', '[CachingDecorator] 结果已缓存');

        return result;
    }

    public clearCache(): void {
        this.cache.clear();
        DemoConsole.log('Decorator', '[CachingDecorator] 缓存已清空');
    }
}
