import { Condition, ControlProps } from '.';

export type HandleOnChange = (args: any) => void;
export type OnAdd = (condition: Condition, groupId: string) => void;
export type OnRemove = (conditionId: string) => void;
export type OnPropChange = (
  key: string,
  value: any,
  conditionId: string,
) => void;
export type OnElementChange = (value: any) => void;

export type ClassNameFunction = (arg: any) => string | string[];
export type ClassName = string | string[] | ClassNameFunction;

export type InputTypeFunction = (props: ControlProps) => string;
export type InputType = string | InputTypeFunction;
