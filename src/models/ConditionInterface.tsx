export type Condition = RuleCondition | RuleGroupCondition;

export interface RuleGroupCondition {
  id: string;
  conditions: Condition[];
  combinator: string;
  [key: string]: any;
}

export interface RuleCondition {
  id: string;
  [key: string]: any;
}
