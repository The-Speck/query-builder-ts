import { Condition } from '.';

export type OnChange = (args: any) => void;
export type OnAdd = (condition: Condition, groupId: string) => void;
export type OnRemove = (conditionId: string) => void;
export type OnPropChange = (
  key: string,
  value: any,
  conditionId: string,
) => void;
export type OnElementChange = (value: any) => void;
