import { MultiTypeCallback, OnChange } from '.';
import { RuleProps } from '../Rule';
import { RuleGroupProps } from '../RuleGroup';

export type MappingFunction = (value: any, props: SystemControlProps) => any;
export type ConditionFunction = (props: any) => boolean;

export interface MultiTypeClassNameObject {
  [element: string]: MultiTypeCallback<string | string[]>;
}

export type ControlElementClassNames =
  | MultiTypeClassNameObject
  | MultiTypeCallback<string | string[]>;

export interface ControlElementProps {
  options?: any[];
  className?: ControlElementClassNames;
  condition?: ConditionFunction;
  defaultValue?: any;
  mapInput?: MappingFunction;
  mapOutput?: MappingFunction;
  onChange?: OnChange;
  [key: string]: any;
}

export interface SystemControlProps {
  onChange: OnChange;
  parentProps: RuleGroupProps | RuleProps;
  value?: any;
}

export type ControlProps = ControlElementProps & SystemControlProps;
