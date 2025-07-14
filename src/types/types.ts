/**
 * @fileoverview types.ts
 * @description 存放项目中常用的通用类型定义。
 */

/**
 * 表示一个值 T，它可能是实际的值，也可能是 null 或 undefined。
 * 常用于数据可能缺失或尚未加载的场景，同时保持严格的类型检查。
 *
 * @template T - 原始类型。
 * @example
 * ```
 * typescript
 * import { Optional } from './types'; // 假设文件路径
 * type User = { id: string; name: string };
 * let currentUser: Optional<User>; // currentUser 可能是 User 类型，也可能是 null 或 undefined
 *
 * let username: Optional<string>; // 等同于 string | null | undefined
 * username = "Alice";
 * username = null;
 * username = undefined;
 *
 * function display(value: Optional<string>) {
 * console.log(value ?? "N/A"); // 使用 ?? 空值合并操作符处理 null/undefined
 * }
 *
 * display(username);
 * ```
 */
export type Optional<T> = T | null | undefined;