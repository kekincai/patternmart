/**
 * IThemeFactory.ts - 主题工厂接口
 * 【Abstract Factory 模式】
 */

export interface IButton {
    getClassName(): string;
    render(): string;
}

export interface ICard {
    getClassName(): string;
    render(): string;
}

export interface IThemeFactory {
    createButton(): IButton;
    createCard(): ICard;
    getThemeName(): string;
}
