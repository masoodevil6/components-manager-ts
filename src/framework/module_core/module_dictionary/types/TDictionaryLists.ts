/** Named lists that a page can use to resolve reusable configuration values. */
export type TDictionaryLists<TEntry = unknown> = Readonly<Record<string, readonly TEntry[]>>;
