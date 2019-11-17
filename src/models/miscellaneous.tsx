import { TCondition } from '.';

export type THandleOnChange = (args: any) => void;
export type TOnAdd = (condition: TCondition, groupId: string) => void;
export type TOnRemove = (conditionId: string, groupId: string) => void;
export type TOnPropChange = (
  key: string,
  value: any,
  conditionId: string,
) => void;
export type TReservedNames = 'conditions' | 'combinator' | 'id';
export type TOnElementChanged = (value: any) => void;
