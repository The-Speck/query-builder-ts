import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import {
  ActionButton,
  ControlActions,
  ValueComboBox,
  ValueDropDown,
  ValueInput,
} from '../src';
import Rule, { RuleElementAttributes, RuleProps } from '../src/Rule';

configure({ adapter: new Adapter() });

jest.mock('../src/controls', () => {
  return {
    ActionButton: (): React.ReactElement => <div>ActionButton</div>,
    ValueComboBox: (): React.ReactElement => <div>ValueComboBox</div>,
    ValueDropDown: (): React.ReactElement => <div>ValueDropDown</div>,
    ValueInput: (): React.ReactElement => <div>ValueInput</div>,
    typeCheck: jest.fn(),
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
    const columns = ['column1', 'column2'];
    props = {
      columns,
      rule,
      query: { id: '1', combinator: 'and', conditions: [rule] },
      rules: [
        {
          component: ValueComboBox,
          name: 'column',
          isColumn: true,
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
    expect((valueComboBox.props() as RuleElementAttributes).options).toBe(
      props.columns,
    );
    expect(valueDropDown.props().value).toBe(props.rule.op);
    expect(valueInput.props().defaultValue).toBe(
      props.rules[2]!.props!.defaultValue,
    );
    expect(actionButton.props().value).toBe(undefined);
  });

  describe('assigns onChange via', () => {
    it('onElementChange with onPropChange callback', () => {
      const valueComboBox = wrapper.find('ValueComboBox');
      const valueDropDown = wrapper.find('ValueDropDown');
      const valueInput = wrapper.find('ValueInput');
      (valueComboBox.props() as RuleElementAttributes).onChange(
        'valueComboBox',
      );
      (valueDropDown.props() as RuleElementAttributes).onChange(
        'valueDropDown',
      );
      (valueInput.props() as RuleElementAttributes).onChange('valueInput');
      expect(props.onPropChange).toBeCalledTimes(3);
    });

    it('removeRule with onRemove callback', () => {
      const event = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      };
      const actionButton = wrapper.find('ActionButton');
      (actionButton.props() as RuleElementAttributes).onChange(event);
      expect(props.onRemove).toBeCalledTimes(1);
      expect(event.preventDefault).toBeCalledTimes(1);
      expect(event.stopPropagation).toBeCalledTimes(1);
    });
  });
});
