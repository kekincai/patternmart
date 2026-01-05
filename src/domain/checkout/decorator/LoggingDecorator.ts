/**
 * LoggingDecorator.ts - 日志装饰器
 * 【Decorator 模式】
 */

import { IPipeline, PipelineRequest, PipelineResult } from '../pipeline/CheckoutPipeline';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class LoggingDecorator implements IPipeline {
    private wrapped: IPipeline;

    constructor(pipeline: IPipeline) {
        this.wrapped = pipeline;
    }

    public run(request: PipelineRequest): PipelineResult {
        DemoConsole.log('Decorator', '[LoggingDecorator] 开始执行...');
        DemoConsole.log('Decorator', `[LoggingDecorator] 输入: ${JSON.stringify(request)}`);

        const result = this.wrapped.run(request);

        DemoConsole.log('Decorator', `[LoggingDecorator] 输出: ${JSON.stringify(result)}`);
        DemoConsole.log('Decorator', '[LoggingDecorator] 执行完成');

        return result;
    }
}
