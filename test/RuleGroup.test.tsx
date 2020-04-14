import { configure, mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ActionButton, ValueComboBox, ValueDropDown, ValueInput } from '../src';
import { Condition, ControlActions } from '../src/models';
import RuleGroup, {
  RuleGroupElementAttributes,
  RuleGroupProps,
} from '../src/RuleGroup';

configure({ adapter: new Adapter() });

jest.mock('../src/controls', () => {
  return {
    ActionButton: (props: any): React.ReactElement => (
      <div id={props.element.name + props.parentProps.level}>ActionButton</div>
    ),
    ValueComboBox: (props: any): React.ReactElement => (
      <div id={props.element.name + props.parentProps.level}>ValueComboBox</div>
    ),
    ValueDropDown: (props: any): React.ReactElement => (
      <div id={props.element.name + props.parentProps.level}>ValueDropDown</div>
    ),
    ValueInput: (props: any): React.ReactElement => (
      <div id={props.element.name + props.parentProps.level}>ValueInput</div>
    ),
    typeCheck: jest.fn(),
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
      rules: [
        {
          component: ValueComboBox,
          name: 'column',
          props: {
            defaultValue: '',
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
            defaultValue: 'default value',
          },
        },
        {
          component: ActionButton,
          name: ControlActions.REMOVE_RULE,
        },
      ],
      ruleGroups: [
        {
          component: ValueDropDown,
          name: 'combinator',
          props: {
            defaultValue: 'and',
          },
        },
        {
          component: ActionButton,
          name: ControlActions.ADD_RULE,
        },
        {
          component: ActionButton,
          name: ControlActions.ADD_GROUP,
        },
        {
          component: ActionButton,
          name: ControlActions.REMOVE_GROUP,
        },
      ],
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
      const addRule = wrapper.find(`#${ControlActions.ADD_RULE}0`);
      const addGroup = wrapper.find(`#${ControlActions.ADD_GROUP}0`);
      const removeGroup = wrapper.find(`#${ControlActions.REMOVE_GROUP}0`);
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
    const addRule = wrapper.find(`#${ControlActions.ADD_RULE}0`);
    const addGroup = wrapper.find(`#${ControlActions.ADD_GROUP}0`);
    const removeGroup = wrapper.find(`#${ControlActions.REMOVE_GROUP}0`);
    expect(combinator.parent().props().value).toBe(props.group.combinator);
    expect(addRule.parent().props().value).toBe(undefined);
    expect(addGroup.parent().props().value).toBe(undefined);
    expect(removeGroup.parent().props().value).toBe(undefined);
  });

  describe('assigns onChange via', () => {
    it('onElementChange with onPropChange callback', () => {
      const combinator = wrapper.find('#combinator0');
      (combinator.parent().props() as RuleGroupElementAttributes).onChange(
        'valueDropDown',
      );
      expect(props.onPropChange).toBeCalledTimes(1);
    });

    it('removeGroup with onRemove callback', () => {
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
      const actionButton = wrapper.find(`#${ControlActions.REMOVE_GROUP}0`);
      (actionButton.parent().props() as RuleGroupElementAttributes).onChange(
        event,
      );
      expect(props.onRemove).toBeCalledTimes(1);
      expect(event.preventDefault).toBeCalledTimes(1);
      expect(event.stopPropagation).toBeCalledTimes(1);
    });

    it('addRule with onAdd callback', () => {
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
      const actionButton = wrapper.find(`#${ControlActions.ADD_RULE}0`);
      (actionButton.parent().props() as RuleGroupElementAttributes).onChange(
        event,
      );
      expect(props.onAdd).toBeCalledTimes(1);
      expect(event.preventDefault).toBeCalledTimes(1);
      expect(event.stopPropagation).toBeCalledTimes(1);
    });

    it('addGroup with onAdd callback', () => {
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
      const actionButton = wrapper.find(`#${ControlActions.ADD_GROUP}0`);
      (actionButton.parent().props() as RuleGroupElementAttributes).onChange(
        event,
      );
      expect(props.onAdd).toBeCalledTimes(1);
      expect(event.preventDefault).toBeCalledTimes(1);
      expect(event.stopPropagation).toBeCalledTimes(1);
    });
  });
});
