import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ActionButton, ValueComboBox, ValueDropDown, ValueInput } from '../src';
import { Condition, RuleElements } from '../src/models';
import RuleGroup, {
  RuleGroupElementAttributes,
  RuleGroupProps,
} from '../src/RuleGroup';

configure({ adapter: new Adapter() });

jest.mock('../src/controls', () => {
  return {
    ActionButton: (props: any): React.ReactElement => (
      <div id={props.name + props.parentProps.level}>ActionButton</div>
    ),
    ValueComboBox: (props: any): React.ReactElement => (
      <div id={props.name + props.parentProps.level}>ValueComboBox</div>
    ),
    ValueDropDown: (props: any): React.ReactElement => (
      <div id={props.name + props.parentProps.level}>ValueDropDown</div>
    ),
    ValueInput: (props: any): React.ReactElement => (
      <div id={props.name + props.parentProps.level}>ValueInput</div>
    ),
    typeCheck: jest.fn(),
    createSortedElements: jest.fn((rules: RuleElements) =>
      Object.values(rules),
    ),
    createRule: jest.fn(() => {}),
    createRuleGroup: jest.fn(() => {}),
    isRuleGroup: jest.fn((condition: Condition) =>
      condition.hasOwnProperty('conditions'),
    ),
  };
});

describe('it', () => {
  let props: RuleGroupProps;
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const group = {
      id: '2',
      combinator: 'or',
      conditions: [],
    };
    const rule = {
      id: '3',
      column: 'test column',
      op: '=',
      value: undefined,
    };
    const query = { id: '1', combinator: 'and', conditions: [group, rule] };
    props = {
      query,
      group: query,
      level: 0,
      rules: {
        columnSelector: {
          component: ValueComboBox,
          name: 'column',
          defaultValue: '',
        },
        operatorSelector: {
          component: ValueDropDown,
          name: 'op',
          defaultValue: '=',
        },
        valueEditor: {
          component: ValueInput,
          name: 'value',
          defaultValue: 'default value',
        },
        removeRuleAction: {
          component: ActionButton,
          name: 'removeRule',
        },
      },
      ruleGroups: {
        combinatorSelector: {
          component: ValueDropDown,
          name: 'combinator',
          defaultValue: 'and',
        },
        addRuleAction: {
          component: ActionButton,
          name: 'addRule',
        },
        addGroupAction: {
          component: ActionButton,
          name: 'addGroup',
        },
        removeGroupAction: {
          component: ActionButton,
          name: 'removeGroup',
        },
      },
      classNames: {
        ruleGroup: 'ruleGroup',
        ruleGroupRow: 'ruleGroupRow',
      },
      onAdd: jest.fn(),
      onRemove: jest.fn(),
      onPropChange: jest.fn(),
    };
    wrapper = mount(<RuleGroup {...props} />);
  });

  describe('renders', () => {
    it('without crashing', () => {
      wrapper.exists();
    });

    it('main rule group elements', () => {
      const combinator = wrapper.find('#combinator0');
      const addRule = wrapper.find('#addRule0');
      const addGroup = wrapper.find('#addGroup0');
      const removeGroup = wrapper.find('#removeGroup0');
      expect(combinator.exists()).toBeTruthy();
      expect(addRule.exists()).toBeTruthy();
      expect(addGroup.exists()).toBeTruthy();
      expect(removeGroup.exists()).toBeTruthy();
    });

    it('child rule group component', () => {
      const childRuleGroup = wrapper.find('#combinator1');
      expect(childRuleGroup.parent().exists()).toBeTruthy();
    });

    it('child rule component', () => {
      const childRule = wrapper.find('Rule');
      expect(childRule.exists()).toBeTruthy();
    });

    it('sorted conditions', () => {
      const children = wrapper.childAt(0).getElement().props.children[1];
      expect(children[0].props.hasOwnProperty('rule')).toBeTruthy();
      expect(children[1].props.hasOwnProperty('group')).toBeTruthy();
    });
  });

  it('sets values', () => {
    const combinator = wrapper.find('#combinator0');
    const addRule = wrapper.find('#addRule0');
    const addGroup = wrapper.find('#addGroup0');
    const removeGroup = wrapper.find('#removeGroup0');
    expect(combinator.parent().props().value).toBe(props.group.combinator);
    expect(addRule.parent().props().value).toBe(undefined);
    expect(addGroup.parent().props().value).toBe(undefined);
    expect(removeGroup.parent().props().value).toBe(undefined);
  });

  describe('assigns handleOnChange via', () => {
    it('onElementChange with onPropChange callback', () => {
      const combinator = wrapper.find('#combinator0');
      (combinator
        .parent()
        .props() as RuleGroupElementAttributes).handleOnChange('valueDropDown');
      expect(props.onPropChange).toBeCalledTimes(1);
    });

    it('removeGroup with onRemove callback', () => {
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
      const actionButton = wrapper.find('#removeGroup0');
      (actionButton
        .parent()
        .props() as RuleGroupElementAttributes).handleOnChange(event);
      expect(props.onRemove).toBeCalledTimes(1);
      expect(event.preventDefault).toBeCalledTimes(1);
      expect(event.stopPropagation).toBeCalledTimes(1);
    });

    it('addRule with onAdd callback', () => {
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
      const actionButton = wrapper.find('#addRule0');
      (actionButton
        .parent()
        .props() as RuleGroupElementAttributes).handleOnChange(event);
      expect(props.onAdd).toBeCalledTimes(1);
      expect(event.preventDefault).toBeCalledTimes(1);
      expect(event.stopPropagation).toBeCalledTimes(1);
    });

    it('addGroup with onAdd callback', () => {
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
      const actionButton = wrapper.find('#addGroup0');
      (actionButton
        .parent()
        .props() as RuleGroupElementAttributes).handleOnChange(event);
      expect(props.onAdd).toBeCalledTimes(1);
      expect(event.preventDefault).toBeCalledTimes(1);
      expect(event.stopPropagation).toBeCalledTimes(1);
    });
  });
});
