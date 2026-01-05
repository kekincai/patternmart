/**
 * Logger.ts - 日志记录器单例
 * 【Singleton 模式】
 * 
 * 提供统一的日志记录接口
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
    private static instance: Logger | null = null;
    private readonly instanceId: string;
    private level: LogLevel = 'info';

    private constructor() {
        this.instanceId = `logger_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 获取单例实例
     */
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    /**
     * 获取实例 ID（用于演示 Singleton）
     */
    public getInstanceId(): string {
        return this.instanceId;
    }

    /**
     * 设置日志级别
     */
    public setLevel(level: LogLevel): void {
        this.level = level;
    }

    /**
     * 格式化时间戳
     */
    private formatTime(): string {
        const now = new Date();
        return now.toTimeString().split(' ')[0];
    }

    /**
     * 记录调试日志
     */
    public debug(module: string, message: string): void {
        if (this.shouldLog('debug')) {
            console.debug(`[${this.formatTime()}][DEBUG][${module}] ${message}`);
        }
    }

    /**
     * 记录信息日志
     */
    public info(module: string, message: string): void {
        if (this.shouldLog('info')) {
            console.info(`[${this.formatTime()}][INFO][${module}] ${message}`);
        }
    }

    /**
     * 记录警告日志
     */
    public warn(module: string, message: string): void {
        if (this.shouldLog('warn')) {
            console.warn(`[${this.formatTime()}][WARN][${module}] ${message}`);
        }
    }

    /**
     * 记录错误日志
     */
    public error(module: string, message: string): void {
        if (this.shouldLog('error')) {
            console.error(`[${this.formatTime()}][ERROR][${module}] ${message}`);
        }
    }

    /**
     * 判断是否应该记录该级别的日志
     */
    private shouldLog(level: LogLevel): boolean {
        const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
        return levels.indexOf(level) >= levels.indexOf(this.level);
    }
}
