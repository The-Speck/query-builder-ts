import isNil from 'lodash/isNil';
import Defaults from '../defaults';
import {
  ControlElement,
  QueryBuilderClassNames,
  RuleCondition,
  RuleGroupCondition,
} from '../models';
import { generateValidQuery } from './generateValidQuery';
import { isValidQuery } from './isValidQuery';
import { quickUUID } from './quickUUID';

export const createInitialClassNames = (
  classNames?: QueryBuilderClassNames,
): QueryBuilderClassNames => {
  const userClassNames = classNames || {};
  const defaultClasNames = Defaults.CLASSNAMES;

  return { ...defaultClasNames, ...userClassNames };
};

export const createInitialQuery = (
  ruleGroups: ControlElement[],
  query?: RuleGroupCondition,
): RuleGroupCondition => {
  return ((isValidQuery(query) && generateValidQuery(query)) ||
    createRuleGroup(ruleGroups)) as RuleGroupCondition;
};

export const createRuleGroup = (
  ruleGroups: ControlElement[],
): RuleGroupCondition => {
  const customRuleGroups = ruleGroups.reduce(
    (acc: Partial<RuleGroupCondition>, { name, props }: ControlElement) => {
      const defaultValue = props && props.defaultValue;
      if (!isNil(name)) {
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

export const createRule = (rules: ControlElement[]): RuleCondition => {
  const customRules = rules.reduce(
    (acc: Partial<RuleCondition>, { name, props }: ControlElement) => {
      const defaultValue = props && props.defaultValue;
      if (!isNil(name)) {
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
