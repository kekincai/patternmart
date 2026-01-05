/**
 * CommandManager.ts - 命令管理器
 * 【Command 模式】管理命令的执行、撤销和重做
 */

import { ICommand } from './ICommand';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export class CommandManager {
    private static instance: CommandManager | null = null;
    private history: ICommand[] = [];
    private redoStack: ICommand[] = [];

    private constructor() { }

    public static getInstance(): CommandManager {
        if (!CommandManager.instance) {
            CommandManager.instance = new CommandManager();
        }
        return CommandManager.instance;
    }

    /**
     * 执行命令
     */
    public execute(command: ICommand): void {
        command.execute();
        this.history.push(command);
        this.redoStack = []; // 执行新命令后清空重做栈
    }

    /**
     * 撤销上一个命令
     */
    public undo(): boolean {
        const command = this.history.pop();
        if (command) {
            command.undo();
            this.redoStack.push(command);
            return true;
        }
        DemoConsole.log('Command', '没有可撤销的操作');
        return false;
    }

    /**
     * 重做上一个撤销的命令
     */
    public redo(): boolean {
        const command = this.redoStack.pop();
        if (command) {
            command.execute();
            this.history.push(command);
            return true;
        }
        DemoConsole.log('Command', '没有可重做的操作');
        return false;
    }

    /**
     * 是否可以撤销
     */
    public canUndo(): boolean {
        return this.history.length > 0;
    }

    /**
     * 是否可以重做
     */
    public canRedo(): boolean {
        return this.redoStack.length > 0;
    }

    /**
     * 清空历史
     */
    public clear(): void {
        this.history = [];
        this.redoStack = [];
    }

    /**
     * 获取历史记录
     */
    public getHistory(): string[] {
        return this.history.map(cmd => cmd.getDescription());
    }
}
