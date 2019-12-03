import { ControlProps } from './ControlPropsInterface';
import { ClassName } from './miscellaneous';

export type ReservedNames = 'conditions' | 'combinator' | 'id';
export type ConditionFunction = (props: any) => boolean;
export type Name = Exclude<string, ReservedNames>;
export type MappingFunction = (value: any, props: ControlProps) => any;

export interface ClassNames {
  [element: string]: ClassName;
}
export type ControlElementClassNames = ClassNames | ClassName;

export interface ControlElement {
  component: React.FunctionComponent<any> | React.ComponentClass<any>;
  name: Name;
  className?: ControlElementClassNames;
  options?: any[];
  label?: string;
  position?: number;
  condition?: ConditionFunction;
  defaultValue?: string;
  mapInput?: MappingFunction;
  mapOutput?: MappingFunction;
}
