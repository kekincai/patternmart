/**
 * LocalStorageAdapter.ts - LocalStorage 适配器
 * 【Adapter 模式】适配浏览器 LocalStorage API
 */

import { IKeyValueStorage } from './IKeyValueStorage';

export class LocalStorageAdapter implements IKeyValueStorage {
    public get(key: string): string | null {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    }

    public set(key: string, value: string): void {
        try {
            localStorage.setItem(key, value);
        } catch {
            console.warn('LocalStorage 写入失败');
        }
    }

    public remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch {
            // ignore
        }
    }

    public clear(): void {
        try {
            localStorage.clear();
        } catch {
            // ignore
        }
    }
}
