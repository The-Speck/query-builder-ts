import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ActionButton, ValueComboBox, ValueDropDown, ValueInput } from '../src';
import { RuleElements } from '../src/models';
import Rule, { IRuleProps } from '../src/Rule';

configure({ adapter: new Adapter() });

jest.mock('../src/utils', () => {
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
  let props: IRuleProps;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const rule = {
      id: '1',
      column: 'test column',
      op: '=',
      value: 'test value',
    };
    props = {
      rule,
      query: { id: '1', combinator: 'and', conditions: [rule] },
      rules: {
        columnSelector: {
          component: ValueComboBox,
          name: 'column',
          options: [],
          className: 'columnSelector',
          position: 1,
          defaultValue: '',
        },
        operatorSelector: {
          component: ValueDropDown,
          name: 'op',
          options: [{ name: '=', label: '=' }],
          className: 'operatorSelector',
          position: 2,
          defaultValue: '=',
        },
        valueEditor: {
          component: ValueInput,
          name: 'value',
          className: 'valueEditor',
          label: 'Value',
          position: 3,
          defaultValue: '',
        },
        removeRuleAction: {
          component: ActionButton,
          name: 'removeRule',
          label: 'x',
          className: 'removeRuleAction',
          position: 99,
        },
      },
      classNames: {
        ruleRow: 'ruleRow',
      },
      onAdd: jest.fn(),
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
      expect(valueComboBox.exists()).toBeTruthy();
    });
  });
});
