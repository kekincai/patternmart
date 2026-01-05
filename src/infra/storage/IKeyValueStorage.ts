/**
 * IKeyValueStorage.ts - 键值存储接口
 */

export interface IKeyValueStorage {
    get(key: string): string | null;
    set(key: string, value: string): void;
    remove(key: string): void;
    clear(): void;
}
