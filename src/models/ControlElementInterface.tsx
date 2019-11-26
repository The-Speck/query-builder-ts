import { TReservedNames } from '.';
import { IControlProps } from './ControlPropsInterface';

export type TConditionFunction = (props: any) => boolean;
export type TName = Exclude<string, TReservedNames>;
export type TMappingFunction = (inputValue: any, props: IControlProps) => any;

export interface ControlElement {
  component: React.FunctionComponent<any> | React.ComponentClass<any>;
  name: TName;
  className?: string | string[];
  options?: any[];
  label?: string;
  position?: number;
  condition?: TConditionFunction;
  defaultValue?: string;
  mapInput?: TMappingFunction;
  mapOutput?: TMappingFunction;
}

export default ControlElement;
