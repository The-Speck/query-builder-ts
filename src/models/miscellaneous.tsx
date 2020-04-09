export type MultiTypeFunction<T> = (...arg: any[]) => T;
export type MultiTypeCallback<T> = T | MultiTypeFunction<T>;
