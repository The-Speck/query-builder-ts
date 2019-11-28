import { IControlProps } from './ControlPropsInterface';
import { TClassName } from './miscellaneous';

export type TReservedNames = 'conditions' | 'combinator' | 'id';
export type TConditionFunction = (props: any) => boolean;
export type TName = Exclude<string, TReservedNames>;
export type TMappingFunction = (inputValue: any, props: IControlProps) => any;

export interface IClassNames {
  [element: string]: TClassName;
}
export type TControlElementClassNames = IClassNames | TClassName;

export interface ControlElement {
  component: React.FunctionComponent<any> | React.ComponentClass<any>;
  name: TName;
  className?: TControlElementClassNames;
  options?: any[];
  label?: string;
  position?: number;
  condition?: TConditionFunction;
  defaultValue?: string;
  mapInput?: TMappingFunction;
  mapOutput?: TMappingFunction;
}

export default ControlElement;
