export type FlatNonNullable<T> = { [k in keyof T]: Exclude<T[k], null> };
