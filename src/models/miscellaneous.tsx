import { TCondition } from '.';

export type THandleOnChange = (args: any) => void;
export type TOnAdd = (condition: TCondition, groupId: string) => void;
export type TOnRemove = (conditionId: string) => void;
export type TOnPropChange = (
  key: string,
  value: any,
  conditionId: string,
) => void;
export type TOnElementChange = (value: any) => void;
export type TClassNameFunction = (arg: any) => string | string[];
export type TClassName = string | string[] | TClassNameFunction;
