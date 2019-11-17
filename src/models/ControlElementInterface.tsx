import { TReservedNames } from '.';

export type TConditionFunction = (props: any) => boolean;
export type TName = Exclude<string, TReservedNames>;

export interface ControlElement {
  component: React.FunctionComponent<any> | React.ComponentClass<any>;
  name: TName;
  className?: string | string[];
  options?: any[];
  label?: string;
  position?: number;
  condition?: TConditionFunction;
  defaultValue?: string;
}

export default ControlElement;
