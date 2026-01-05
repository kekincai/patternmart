/**
 * ICommand.ts - 命令接口
 * 【Command 模式】定义命令的统一接口
 */

export interface ICommand {
    execute(): void;
    undo(): void;
    getDescription(): string;
}
