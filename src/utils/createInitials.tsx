import merge from 'lodash/merge';
import { isValidQuery, quickUUID } from '.';
import Defaults from '../defaults';
import defaultCombinatorSelector from '../defaults/ruleGroupElements/combinatorSelector';
import {
  ClassNames,
  ControlElement,
  IRule,
  IRuleGroup,
  RuleElements,
  RuleGroupElements,
} from '../models';

export const createInitialClassNames = (classNames: ClassNames): ClassNames => {
  const userClassNames = classNames || {};
  const defaultClasNames = Defaults.classNames;

  return merge({}, defaultClasNames, userClassNames);
};

export const createInitialRuleElements = (
  columns: any[],
  rules?: RuleElements,
): RuleElements => {
  const userRuleElements = rules || {};
  const defaultRuleElements = Defaults.ruleElements;

  defaultRuleElements.columnSelector.options = columns;

  return merge({}, defaultRuleElements, userRuleElements);
};

export const createInitialRuleGroupElements = (
  ruleGroups?: RuleGroupElements,
): RuleGroupElements => {
  const userRuleGroupElements = ruleGroups || {};
  const defaultRuleGroupElements = Defaults.ruleGroupElements;

  return merge({}, defaultRuleGroupElements, userRuleGroupElements);
};

export const createInitialQuery = (
  query: IRuleGroup,
  ruleGroups: RuleGroupElements,
): IRuleGroup => {
  return (isValidQuery(query) && query) || createRuleGroup(ruleGroups);
};

export const createRuleGroup = (ruleGroups: RuleGroupElements): IRuleGroup => {
  const customRuleGroups = Object.values(ruleGroups).reduce(
    (acc: Partial<IRuleGroup>, { name, defaultValue }: ControlElement) => {
      if (
        name !== ruleGroups.addGroupAction.name &&
        name !== ruleGroups.addRuleAction.name &&
        name !== ruleGroups.removeGroupAction.name
      ) {
        acc[name] = defaultValue;
      }
      return acc;
    },
    {},
  );

  return {
    ...customRuleGroups,
    id: `g-${quickUUID()}`,
    conditions: [],
    combinator:
      ruleGroups.combinatorSelector.defaultValue ||
      defaultCombinatorSelector.defaultValue,
  };
};

export const createRule = (rules: RuleElements): IRule => {
  const customRules = Object.values(rules).reduce(
    (acc: Partial<IRule>, { name, defaultValue }: ControlElement) => {
      if (name !== rules.removeRuleAction.name) {
        acc[name] = defaultValue;
      }
      return acc;
    },
    {},
  );

  return {
    ...customRules,
    id: `g-${quickUUID()}`,
  };
};
