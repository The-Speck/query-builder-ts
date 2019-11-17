import { IRule } from '.';

export type TCondition = IRule | IRuleGroup;

export interface IRuleGroup {
  id: string;
  conditions: TCondition[];
  combinator: string;
  [key: string]: any;
}

export default IRuleGroup;
