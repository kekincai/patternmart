/**
 * DarkThemeFactory.ts - 深色主题工厂
 * 【Abstract Factory 模式】
 */

import { IThemeFactory, IButton, ICard } from './IThemeFactory';

class DarkButton implements IButton {
    getClassName(): string { return 'btn-dark'; }
    render(): string { return '<button class="btn btn-dark">Dark Button</button>'; }
}

class DarkCard implements ICard {
    getClassName(): string { return 'card-dark'; }
    render(): string { return '<div class="card card-dark">Dark Card</div>'; }
}

export class DarkThemeFactory implements IThemeFactory {
    createButton(): IButton { return new DarkButton(); }
    createCard(): ICard { return new DarkCard(); }
    getThemeName(): string { return 'dark'; }
}
