/**
 * DemoConsole.ts - 全局演示控制台
 * 
 * 右下角可折叠的控制台面板，用于显示所有模式的演示输出
 * 输出格式：[HH:MM:SS][PatternName] message
 */

interface ConsoleEntry {
    timestamp: string;
    pattern: string;
    message: string;
}

export class DemoConsole {
    private static entries: ConsoleEntry[] = [];
    private static container: HTMLElement | null = null;
    private static body: HTMLElement | null = null;
    private static filterInput: HTMLInputElement | null = null;
    private static isCollapsed = false;
    private static currentFilter = '';

    /**
     * 记录日志到控制台
     * @param pattern 模式名称
     * @param message 日志消息
     */
    public static log(pattern: string, message: string): void {
        const timestamp = new Date().toTimeString().split(' ')[0];
        const entry: ConsoleEntry = { timestamp, pattern, message };
        this.entries.push(entry);
        this.renderEntry(entry);
        this.scrollToBottom();
    }

    /**
     * 清空控制台
     */
    public static clear(): void {
        this.entries = [];
        if (this.body) {
            this.body.innerHTML = '';
        }
    }

    /**
     * 渲染控制台到页面
     */
    public static render(): void {
        if (this.container) {
            return; // 已经渲染过
        }

        this.container = document.createElement('div');
        this.container.className = 'demo-console';
        this.container.innerHTML = `
      <div class="demo-console-header">
        <span class="demo-console-title">🖥️ Demo Console</span>
        <div class="demo-console-controls">
          <button class="btn-clear" title="清空">🗑️</button>
          <button class="btn-toggle" title="折叠/展开">▼</button>
        </div>
      </div>
      <div class="demo-console-filter">
        <input type="text" placeholder="按模式名称过滤..." />
      </div>
      <div class="demo-console-body"></div>
    `;

        document.body.appendChild(this.container);

        // 获取元素引用
        this.body = this.container.querySelector('.demo-console-body');
        this.filterInput = this.container.querySelector('.demo-console-filter input');

        // 绑定事件
        const header = this.container.querySelector('.demo-console-header');
        const clearBtn = this.container.querySelector('.btn-clear');
        const toggleBtn = this.container.querySelector('.btn-toggle');

        header?.addEventListener('click', (e) => {
            if ((e.target as HTMLElement).closest('.demo-console-controls')) {
                return;
            }
            this.toggle();
        });

        clearBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.clear();
        });

        toggleBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        this.filterInput?.addEventListener('input', (e) => {
            this.currentFilter = (e.target as HTMLInputElement).value.toLowerCase();
            this.rerender();
        });

        // 渲染已有的日志
        this.rerender();
    }

    /**
     * 切换折叠状态
     */
    private static toggle(): void {
        this.isCollapsed = !this.isCollapsed;
        if (this.container) {
            this.container.classList.toggle('collapsed', this.isCollapsed);
            const toggleBtn = this.container.querySelector('.btn-toggle');
            if (toggleBtn) {
                toggleBtn.textContent = this.isCollapsed ? '▲' : '▼';
            }
        }
    }

    /**
     * 渲染单条日志
     */
    private static renderEntry(entry: ConsoleEntry): void {
        if (!this.body) return;

        // 检查过滤条件
        if (this.currentFilter && !entry.pattern.toLowerCase().includes(this.currentFilter)) {
            return;
        }

        const line = document.createElement('div');
        line.className = 'console-line';
        line.innerHTML = `
      <span class="timestamp">[${entry.timestamp}]</span>
      <span class="pattern-name">[${entry.pattern}]</span>
      <span class="message">${this.escapeHtml(entry.message)}</span>
    `;
        this.body.appendChild(line);
    }

    /**
     * 重新渲染所有日志
     */
    private static rerender(): void {
        if (!this.body) return;
        this.body.innerHTML = '';
        for (const entry of this.entries) {
            this.renderEntry(entry);
        }
        this.scrollToBottom();
    }

    /**
     * 滚动到底部
     */
    private static scrollToBottom(): void {
        if (this.body) {
            this.body.scrollTop = this.body.scrollHeight;
        }
    }

    /**
     * HTML 转义
     */
    private static escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * 获取所有日志条目
     */
    public static getEntries(): ConsoleEntry[] {
        return [...this.entries];
    }
}
