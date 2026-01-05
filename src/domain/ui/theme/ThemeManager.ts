/**
 * ThemeManager.ts - 主题管理器
 */

import { IThemeFactory } from './IThemeFactory';
import { LightThemeFactory } from './LightThemeFactory';
import { DarkThemeFactory } from './DarkThemeFactory';
import { RetroThemeFactory } from './RetroThemeFactory';
import { DemoConsole } from '../../../app/demo/DemoConsole';

export type ThemeName = 'light' | 'dark' | 'retro';

export class ThemeManager {
    private static instance: ThemeManager | null = null;
    private currentTheme: ThemeName = 'light';
    private factories: Map<ThemeName, IThemeFactory> = new Map();

    private constructor() {
        this.factories.set('light', new LightThemeFactory());
        this.factories.set('dark', new DarkThemeFactory());
        this.factories.set('retro', new RetroThemeFactory());
    }

    public static getInstance(): ThemeManager {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }

    public applyTheme(theme: ThemeName): void {
        this.currentTheme = theme;
        document.body.className = `theme-${theme}`;
        DemoConsole.log('Abstract Factory', `切换主题: ${theme}`);
    }

    public getCurrentTheme(): ThemeName {
        return this.currentTheme;
    }

    public getFactory(): IThemeFactory {
        return this.factories.get(this.currentTheme)!;
    }

    public getAvailableThemes(): ThemeName[] {
        return Array.from(this.factories.keys());
    }
}
