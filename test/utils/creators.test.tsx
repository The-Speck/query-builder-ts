import {
  ActionButton,
  MultiTypeFunction,
  RuleGroupElement,
  ValueComboBox,
  ValueDropDown,
  ValueInput,
} from '../../src';
import { createClassNames, createRule, createRuleGroup } from '../../src/utils';

describe('it', () => {
  describe('creates default', () => {
    it('class names', () => {
      const classNames = createClassNames();

      expect(classNames.hasOwnProperty('queryBuilder')).toBeTruthy();
      expect(classNames.hasOwnProperty('ruleGroup')).toBeTruthy();
      expect(classNames.hasOwnProperty('ruleGroupRow')).toBeTruthy();
      expect(classNames.hasOwnProperty('ruleRow')).toBeTruthy();
      expect(
        (classNames.ruleGroup as MultiTypeFunction<string>)({
          level: 0,
        }),
      ).toBe('');
    });
  });

  describe('creates user', () => {
    it('class names', () => {
      const userClassNames = {
        queryBuilder: 'a',
        ruleGroup: 'b',
        ruleGroupRow: 'c',
        ruleRow: 'd',
      };
      const classNames = createClassNames(userClassNames);

      expect(classNames.queryBuilder).toBe(userClassNames.queryBuilder);
      expect(classNames.ruleGroup).toBe(userClassNames.ruleGroup);
      expect(classNames.ruleGroupRow).toBe(userClassNames.ruleGroupRow);
      expect(classNames.ruleRow).toBe(userClassNames.ruleRow);
    });
  });

  it('creates rule group condition', () => {
    const ruleGroups: RuleGroupElement[] = [
      {
        component: ValueDropDown,
        name: 'combinator',
        props: {
          defaultValue: 'and',
        },
      },
      { component: ActionButton, name: 'addRule' },
      { component: ActionButton, name: 'addGroup' },
      {
        component: ActionButton,
        name: 'removeGroup',
      },
    ];

    const ruleGroup = createRuleGroup(ruleGroups);
    expect(ruleGroup.id.startsWith('g-')).toBeTruthy();
    expect(ruleGroup.conditions.length).toBe(0);
    expect(ruleGroup.combinator).toBe('and');
    expect(ruleGroup.addRule).toBe(undefined);
    expect(ruleGroup.addGroup).toBe(undefined);
    expect(ruleGroup.removeGroup).toBe(undefined);
  });

  it('creates rule condition', () => {
    const rules: RuleGroupElement[] = [
      {
        component: ValueComboBox,
        name: 'column',
        props: {
          defaultValue: 'blank',
        },
      },
      {
        component: ValueDropDown,
        name: 'op',
        props: {
          defaultValue: '=',
        },
      },
      {
        component: ValueInput,
        name: 'value',
        props: {
          defaultValue: 'nothing',
        },
      },
      { component: ActionButton, name: 'removeRule' },
    ];

    const rule = createRule(rules);
    expect(rule.id.startsWith('r-')).toBeTruthy();
    expect(rule.column).toBe('blank');
    expect(rule.op).toBe('=');
    expect(rule.value).toBe('nothing');
    expect(rule.removeRule).toBe(undefined);
  });
});
