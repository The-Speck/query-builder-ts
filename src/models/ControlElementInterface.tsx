import { MultiTypeCallback } from '.';
import { ControlElementProps, ControlProps } from './ControlPropsInterface';

export type ReservedNames = 'conditions' | 'combinator' | 'id' | ActionTypes;

export type ControlName = Exclude<string, ReservedNames>;
export type InputTypeFunction = (
  value: any,
  props: ControlProps,
) => React.InputHTMLAttributes<HTMLInputElement>;
export type InputType =
  | React.InputHTMLAttributes<HTMLInputElement>
  | InputTypeFunction;

export enum ActionTypes {
  ADD_GROUP = 'ADD_GROUP',
  ADD_RULE = 'ADD_RULE',
  REMOVE_GROUP = 'REMOVE_GROUP',
  REMOVE_RULE = 'REMOVE_RULE',
}

export interface ControlElement {
  component: React.FunctionComponent<any> | React.ComponentClass<any>;
  position: number;
  props: ControlElementProps;
  name: ControlName;
  isColumn?: MultiTypeCallback<boolean>;
}
