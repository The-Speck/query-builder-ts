import { Condition } from './ConditionInterface';
import { ControlProps } from './ControlPropsInterface';

export type HandleOnChange = (args: any) => void;
export type OnAdd = (condition: Condition, groupId: string) => void;
export type OnRemove = (conditionId: string) => void;
export type OnPropChange = (
  key: string,
  value: any,
  conditionId: string,
) => void;
export type OnElementChange = (value: any) => void;

export type ClassNameFunction = (...arg: any[]) => string | string[];
export type MultiTypeClassName = string | string[] | ClassNameFunction;

export type InputTypeFunction = (value: any, props: ControlProps) => string;
export type InputType = string | InputTypeFunction;
