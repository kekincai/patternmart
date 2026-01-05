/**
 * RetroThemeFactory.ts - 复古主题工厂
 * 【Abstract Factory 模式】
 */

import { IThemeFactory, IButton, ICard } from './IThemeFactory';

class RetroButton implements IButton {
    getClassName(): string { return 'btn-retro'; }
    render(): string { return '<button class="btn btn-retro">Retro Button</button>'; }
}

class RetroCard implements ICard {
    getClassName(): string { return 'card-retro'; }
    render(): string { return '<div class="card card-retro">Retro Card</div>'; }
}

export class RetroThemeFactory implements IThemeFactory {
    createButton(): IButton { return new RetroButton(); }
    createCard(): ICard { return new RetroCard(); }
    getThemeName(): string { return 'retro'; }
}
