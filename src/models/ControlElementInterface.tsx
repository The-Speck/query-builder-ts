import { ControlProps, InputType, MultiTypeClassName } from '.';

export type ReservedNames = 'conditions' | 'combinator' | 'id';
export type ConditionFunction = (props: any) => boolean;
export type Name = Exclude<string, ReservedNames>;
export type MappingFunction = (value: any, props: ControlProps) => any;

export interface MultiTypeClassNameObject {
  [element: string]: MultiTypeClassName;
}
export type ControlElementClassNames =
  | MultiTypeClassNameObject
  | MultiTypeClassName;

export interface ControlElement {
  component: React.FunctionComponent<any> | React.ComponentClass<any>;
  name: Name;
  className?: ControlElementClassNames;
  options?: any[];
  label?: string;
  position?: number;
  condition?: ConditionFunction;
  defaultValue?: any;
  mapInput?: MappingFunction;
  mapOutput?: MappingFunction;
  debounceTime?: number;
  inputType?: InputType;
}
