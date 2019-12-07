import merge from 'lodash/merge';
import Defaults from '../defaults';
import {
  ControlElement,
  QueryBuilderClassNames,
  RuleCondition,
  RuleElements,
  RuleGroupCondition,
  RuleGroupElements,
} from '../models';
import { generateValidQuery } from './generateValidQuery';
import { isValidQuery } from './isValidQuery';
import { quickUUID } from './quickUUID';

const assignColumns = (rules: RuleElements, columns?: any[]): void => {
  if (columns && rules.columnSelector && !rules.columnSelector.options) {
    rules.columnSelector.options = columns;
  }
};

export const createInitialClassNames = (
  classNames?: QueryBuilderClassNames,
): QueryBuilderClassNames => {
  const userClassNames = classNames || {};
  const defaultClasNames = Defaults.classNames;

  return { ...defaultClasNames, ...userClassNames };
};

export const createInitialRuleElements = (
  columns?: any[],
  rules?: Partial<RuleElements>,
): RuleElements => {
  const userRuleElements = rules || {};
  const defaultRuleElements = Defaults.ruleElements;

  const ruleElements = merge({}, defaultRuleElements, userRuleElements);
  assignColumns(ruleElements, columns);

  return ruleElements;
};

export const createInitialRuleGroupElements = (
  ruleGroups?: Partial<RuleGroupElements>,
): RuleGroupElements => {
  const userRuleGroupElements = ruleGroups || {};
  const defaultRuleGroupElements = Defaults.ruleGroupElements;

  return merge({}, defaultRuleGroupElements, userRuleGroupElements);
};

export const createInitialQuery = (
  ruleGroups: RuleGroupElements,
  query?: RuleGroupCondition,
): RuleGroupCondition => {
  return ((isValidQuery(query) && generateValidQuery(query)) ||
    createRuleGroup(ruleGroups)) as RuleGroupCondition;
};

export const createRuleGroup = (
  ruleGroups: RuleGroupElements,
): RuleGroupCondition => {
  const customRuleGroups = Object.values(ruleGroups).reduce(
    (
      acc: Partial<RuleGroupCondition>,
      { name, defaultValue }: ControlElement,
    ) => {
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
  };
};

export const createRule = (rules: RuleElements): RuleCondition => {
  const customRules = Object.values(rules).reduce(
    (acc: Partial<RuleCondition>, { name, defaultValue }: ControlElement) => {
      if (name !== rules.removeRuleAction.name) {
        acc[name] = defaultValue;
      }
      return acc;
    },
    {},
  );

  return {
    ...customRules,
    id: `r-${quickUUID()}`,
  };
};
