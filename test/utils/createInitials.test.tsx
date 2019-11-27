import {
  ActionButton,
  ValueComboBox,
  ValueDropDown,
  ValueInput,
} from '../../src';
import {
  createInitialClassNames,
  createInitialRuleElements,
  createInitialRuleGroupElements,
  createRule,
  createRuleGroup,
} from '../../src/utils';

describe('it', () => {
  describe('creates default', () => {
    it('class names', () => {
      const classNames = createInitialClassNames();

      expect(classNames.hasOwnProperty('queryBuilder')).toBeTruthy();
      expect(classNames.hasOwnProperty('ruleGroup')).toBeTruthy();
      expect(classNames.hasOwnProperty('ruleGroupRow')).toBeTruthy();
      expect(classNames.hasOwnProperty('ruleRow')).toBeTruthy();
    });

    it('rule elements', () => {
      const columns = ['fruits', 'cars'];
      const ruleElements = createInitialRuleElements(columns);
      expect(ruleElements.hasOwnProperty('columnSelector')).toBeTruthy();
      expect(ruleElements.hasOwnProperty('operatorSelector')).toBeTruthy();
      expect(ruleElements.hasOwnProperty('valueEditor')).toBeTruthy();
      expect(ruleElements.hasOwnProperty('removeRuleAction')).toBeTruthy();
      expect(ruleElements.columnSelector.options).toStrictEqual(columns);
    });

    it('rule group elements', () => {
      const ruleGroupElements = createInitialRuleGroupElements();
      expect(
        ruleGroupElements.hasOwnProperty('combinatorSelector'),
      ).toBeTruthy();
      expect(ruleGroupElements.hasOwnProperty('addRuleAction')).toBeTruthy();
      expect(ruleGroupElements.hasOwnProperty('addGroupAction')).toBeTruthy();
      expect(
        ruleGroupElements.hasOwnProperty('removeGroupAction'),
      ).toBeTruthy();
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
      const classNames = createInitialClassNames(userClassNames);

      expect(classNames.queryBuilder).toBe(userClassNames.queryBuilder);
      expect(classNames.ruleGroup).toBe(userClassNames.ruleGroup);
      expect(classNames.ruleGroupRow).toBe(userClassNames.ruleGroupRow);
      expect(classNames.ruleRow).toBe(userClassNames.ruleRow);
    });

    it('rule elements', () => {
      const columns = ['fruits', 'cars'];
      const rules = {
        columnSelector: { component: ValueComboBox, name: 'column1' },
        operatorSelector: { component: ValueDropDown, name: 'op1' },
        valueEditor: { component: ValueInput, name: 'value1' },
        otherSelector: { component: ValueComboBox, name: 'someOtherSelector' },
        removeRuleAction: { component: ActionButton, name: 'removeRule1' },
      };
      const ruleElements = createInitialRuleElements(columns, rules);
      expect(ruleElements.columnSelector.name).toBe('column1');
      expect(ruleElements.operatorSelector.name).toBe('op1');
      expect(ruleElements.valueEditor.name).toBe('value1');
      expect(ruleElements.removeRuleAction.name).toBe('removeRule1');
      expect(ruleElements.otherSelector.name).toBe('someOtherSelector');
      expect(ruleElements.columnSelector.options).toStrictEqual(columns);
    });

    it('rule group elements', () => {
      const ruleGroups = {
        combinatorSelector: { component: ValueDropDown, name: 'combinator1' },
        addRuleAction: { component: ActionButton, name: 'addRule1' },
        addGroupAction: { component: ActionButton, name: 'addGroup1' },
        removeGroupAction: {
          component: ActionButton,
          name: 'removeGroup1',
        },
        otherSelector: { component: ValueComboBox, name: 'someOtherSelector' },
      };
      const ruleElements = createInitialRuleGroupElements(ruleGroups);
      expect(ruleElements.combinatorSelector.name).toBe('combinator1');
      expect(ruleElements.addRuleAction.name).toBe('addRule1');
      expect(ruleElements.addGroupAction.name).toBe('addGroup1');
      expect(ruleElements.removeGroupAction.name).toBe('removeGroup1');
      expect(ruleElements.otherSelector.name).toBe('someOtherSelector');
    });
  });

  it('creates rule group condition', () => {
    const ruleGroups = {
      combinatorSelector: {
        component: ValueDropDown,
        name: 'combinator',
        defaultValue: 'and',
      },
      addRuleAction: { component: ActionButton, name: 'addRule' },
      addGroupAction: { component: ActionButton, name: 'addGroup' },
      removeGroupAction: {
        component: ActionButton,
        name: 'removeGroup',
      },
    };

    const ruleGroup = createRuleGroup(ruleGroups);
    expect(ruleGroup.id.startsWith('g-')).toBeTruthy();
    expect(ruleGroup.conditions.length).toBe(0);
    expect(ruleGroup.combinator).toBe('and');
    expect(ruleGroup.addRule).toBe(undefined);
    expect(ruleGroup.addGroup).toBe(undefined);
    expect(ruleGroup.removeGroup).toBe(undefined);
  });

  it('creates rule condition', () => {
    const rules = {
      columnSelector: {
        component: ValueComboBox,
        name: 'column',
        defaultValue: 'blank',
      },
      operatorSelector: {
        component: ValueDropDown,
        name: 'op',
        defaultValue: '=',
      },
      valueEditor: {
        component: ValueInput,
        name: 'value',
        defaultValue: 'nothing',
      },
      removeRuleAction: { component: ActionButton, name: 'removeRule' },
    };

    const rule = createRule(rules);
    expect(rule.id.startsWith('r-')).toBeTruthy();
    expect(rule.column).toBe('blank');
    expect(rule.op).toBe('=');
    expect(rule.value).toBe('nothing');
    expect(rule.removeRule).toBe(undefined);
  });
});
