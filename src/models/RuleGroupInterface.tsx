import { IRule } from '.';

export interface IRuleGroup {
  conditions: Array<IRule | IRuleGroup>;
  combinator: string;
}

export default IRuleGroup;
