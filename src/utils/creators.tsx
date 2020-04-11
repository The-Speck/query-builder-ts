import isNil from 'lodash/isNil';
import Defaults from '../defaults';
import {
  QueryBuilderClassNames,
  RuleCondition,
  RuleElement,
  RuleGroupCondition,
  RuleGroupElement,
} from '../models';
import { generateValidQuery } from './generateValidQuery';
import { isValidQuery } from './isValidQuery';
import { quickUUID } from './quickUUID';

export const createClassNames = (
  classNames?: QueryBuilderClassNames,
): QueryBuilderClassNames => {
  const userClassNames = classNames || {};
  const defaultClasNames = Defaults.CLASSNAMES;

  return { ...defaultClasNames, ...userClassNames };
};

export const createQuery = (
  ruleGroups: RuleGroupElement[],
  query?: RuleGroupCondition,
): RuleGroupCondition => {
  return ((isValidQuery(query) && generateValidQuery(query)) ||
    createRuleGroup(ruleGroups)) as RuleGroupCondition;
};

export const createRuleGroup = (
  ruleGroups: RuleElement[],
): RuleGroupCondition => {
  const customRuleGroups = ruleGroups.reduce(
    (acc: Partial<RuleGroupCondition>, { name, props }: RuleGroupElement) => {
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

export const createRule = (rules: RuleElement[]): RuleCondition => {
  const customRules = rules.reduce(
    (acc: Partial<RuleCondition>, { name, props }: RuleElement) => {
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
