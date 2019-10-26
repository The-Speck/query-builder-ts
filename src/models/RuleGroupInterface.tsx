import { IRule } from '.';

export type Condition = IRule | IRuleGroup;

export interface IRuleGroup {
  conditions: Condition[];
  combinator: string;
}

export default IRuleGroup;
