/**
 * LightThemeFactory.ts - 浅色主题工厂
 * 【Abstract Factory 模式】
 */

import { IThemeFactory, IButton, ICard } from './IThemeFactory';

class LightButton implements IButton {
    getClassName(): string { return 'btn-light'; }
    render(): string { return '<button class="btn btn-light">Light Button</button>'; }
}

class LightCard implements ICard {
    getClassName(): string { return 'card-light'; }
    render(): string { return '<div class="card card-light">Light Card</div>'; }
}

export class LightThemeFactory implements IThemeFactory {
    createButton(): IButton { return new LightButton(); }
    createCard(): ICard { return new LightCard(); }
    getThemeName(): string { return 'light'; }
}
