import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ActionButton, ValueComboBox, ValueDropDown, ValueInput } from '../src';
import { RuleElements } from '../src/models';
import Rule, { RuleElementAttributes, RuleProps } from '../src/Rule';

configure({ adapter: new Adapter() });

jest.mock('../src/controls', () => {
  return {
    ActionButton: (): React.ReactElement => <div>ActionButton</div>,
    ValueComboBox: (): React.ReactElement => <div>ValueComboBox</div>,
    ValueDropDown: (): React.ReactElement => <div>ValueDropDown</div>,
    ValueInput: (): React.ReactElement => <div>ValueInput</div>,
    typeCheck: jest.fn(),
    createSortedElements: jest.fn((rules: RuleElements) =>
      Object.values(rules),
    ),
  };
});

describe('it', () => {
  let props: RuleProps;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const rule = {
      id: '2',
      column: 'test column',
      op: '=',
      value: undefined,
    };
    props = {
      rule,
      query: { id: '1', combinator: 'and', conditions: [rule] },
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
      classNames: {
        ruleRow: 'ruleRow',
      },
      onRemove: jest.fn(),
      onPropChange: jest.fn(),
    };
    wrapper = shallow(<Rule {...props} />);
  });

  describe('renders', () => {
    it('without crashing', () => {
      wrapper.exists();
    });
    it('rule elements', () => {
      const valueComboBox = wrapper.find('ValueComboBox');
      const valueDropDown = wrapper.find('ValueDropDown');
      const valueInput = wrapper.find('ValueInput');
      const actionButton = wrapper.find('ActionButton');
      expect(valueComboBox.exists()).toBeTruthy();
      expect(valueDropDown.exists()).toBeTruthy();
      expect(valueInput.exists()).toBeTruthy();
      expect(actionButton.exists()).toBeTruthy();
    });
  });

  it('sets values', () => {
    const valueComboBox = wrapper.find('ValueComboBox');
    const valueDropDown = wrapper.find('ValueDropDown');
    const valueInput = wrapper.find('ValueInput');
    const actionButton = wrapper.find('ActionButton');
    expect(valueComboBox.props().value).toBe(props.rule.column);
    expect(valueDropDown.props().value).toBe(props.rule.op);
    expect(valueInput.props().value).toBe(props.rules.valueEditor.defaultValue);
    expect(actionButton.props().value).toBe(undefined);
  });

  describe('assigns handleOnChange via', () => {
    it('onElementChange with onPropChange callback', () => {
      const valueComboBox = wrapper.find('ValueComboBox');
      const valueDropDown = wrapper.find('ValueDropDown');
      const valueInput = wrapper.find('ValueInput');
      (valueComboBox.props() as RuleElementAttributes).handleOnChange(
        'valueComboBox',
      );
      (valueDropDown.props() as RuleElementAttributes).handleOnChange(
        'valueDropDown',
      );
      (valueInput.props() as RuleElementAttributes).handleOnChange(
        'valueInput',
      );
      expect(props.onPropChange).toBeCalledTimes(3);
    });

    it('removeRule with onRemove callback', () => {
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
      const actionButton = wrapper.find('ActionButton');
      (actionButton.props() as RuleElementAttributes).handleOnChange(event);
      expect(props.onRemove).toBeCalledTimes(1);
      expect(event.preventDefault).toBeCalledTimes(1);
      expect(event.stopPropagation).toBeCalledTimes(1);
    });
  });
});
