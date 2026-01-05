/**
 * TimingDecorator.ts - 计时装饰器
 * 【Decorator 模式】
 */

import { IPipeline, PipelineRequest, PipelineResult } from '../pipeline/CheckoutPipeline';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class TimingDecorator implements IPipeline {
    private wrapped: IPipeline;

    constructor(pipeline: IPipeline) {
        this.wrapped = pipeline;
    }

    public run(request: PipelineRequest): PipelineResult {
        const start = performance.now();
        DemoConsole.log('Decorator', '[TimingDecorator] 开始计时...');

        const result = this.wrapped.run(request);

        const end = performance.now();
        const duration = (end - start).toFixed(2);
        DemoConsole.log('Decorator', `[TimingDecorator] 执行耗时: ${duration}ms`);

        return result;
    }
}
