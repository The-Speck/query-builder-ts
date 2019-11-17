import { TCondition } from '.';

export type THandleOnChange = (args: any) => void;
export type onAdd = (condition: TCondition, parentId: string) => void;
export type TReservedNames = 'conditions' | 'combinator' | 'id';
