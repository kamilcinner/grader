import { DeepNonNullable } from 'ts-essentials';

export class ObjectUtils {
  static removeFlatNulls<T extends Record<string, unknown>>(source: T) {
    return Object.fromEntries(Object.entries(source).filter(([, value]) => value != null)) as DeepNonNullable<T>;
  }
}
