import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import QueryBuilder from '../src/index';
import {
  QueryBuilderClassNames,
  RuleGroupCondition,
  RuleGroupElement,
} from '../src/models';
import { QueryBuilderProps } from '../src/QueryBuilder';
import { RuleGroupProps } from '../src/RuleGroup';
import {
  createClassNames,
  createQuery,
  findCondition,
  findConditionIdxAndParentGroup,
  isNumber,
  isRuleGroup,
  typeCheck,
} from '../src/utils';

configure({ adapter: new Adapter() });

jest.mock('../src/utils', () => {
  const condition = {
    id: '1',
    combinator: 'and',
    conditions: [],
  };
  return {
    createClassNames: jest.fn((_: QueryBuilderClassNames) => ({
      queryBuilder: 'queryBuilder',
    })),
    createQuery: jest.fn(
      (_1: RuleGroupElement, _2: RuleGroupCondition) => condition,
    ),
    findCondition: jest.fn((conditionId: string, query: RuleGroupCondition) =>
      conditionId ? query : null,
    ),
    findConditionIdxAndParentGroup: jest.fn(
      (conditionId: string, query: RuleGroupCondition) =>
        conditionId ? [0, query] : [],
    ),
    isNumber: jest.fn((_: number) => true),
    isRuleGroup: jest.fn((_: RuleGroupCondition) => true),
    typeCheck: jest.fn(),
  };
});

describe('it', () => {
  let props: QueryBuilderProps;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    props = {
      columns: ['apple', 'water', 'dog'],
      onQueryChange: jest.fn(),
    };
    wrapper = shallow(<QueryBuilder {...props} />);
  });

  describe('renders', () => {
    it('without crashing', () => {
      wrapper.exists();
    });
    it('ruleGroup', () => {
      const ruleGroup = wrapper.find('RuleGroup');
      expect(ruleGroup.exists()).toBeTruthy();
    });
    it('ruleGroup with query', () => {
      const query: RuleGroupCondition = wrapper.state('query');
      expect(query.id).toBe('1');
    });
    it('calls typeCheck when rendering root', () => {
      expect(typeCheck).toHaveBeenCalled();
    });
  });

  describe('creates', () => {
    it('class names', () => {
      expect(createClassNames).toHaveBeenCalled();
    });
    it('initialized state', () => {
      expect(createQuery).toHaveBeenCalled();
    });
  });

  describe('assigns on', () => {
    it('add', () => {
      const ruleGroup = wrapper.find('RuleGroup');
      const onAdd = (ruleGroup.props() as RuleGroupProps).onAdd;
      onAdd(
        {
          id: '2',
          combinator: 'and',
          conditions: [],
        },
        '1',
      );
      expect(findCondition).toHaveBeenCalled();
      expect(isRuleGroup).toHaveBeenCalled();
      expect(props.onQueryChange).toHaveBeenCalled();
      expect(
        (wrapper.state('query') as RuleGroupCondition).conditions[0].id,
      ).toBe('2');
    });
    it('remove', () => {
      wrapper.setState({
        id: '1',
        combinator: 'and',
        conditions: [
          {
            id: '2',
            combinator: 'and',
            conditions: [],
          },
        ],
      });
      const ruleGroup = wrapper.find('RuleGroup');
      const onRemove = (ruleGroup.props() as RuleGroupProps).onRemove;
      onRemove('2');
      expect(findConditionIdxAndParentGroup).toHaveBeenCalled();
      expect(isNumber).toHaveBeenCalled();
      expect(isRuleGroup).toHaveBeenCalled();
      expect(props.onQueryChange).toHaveBeenCalled();
      expect(
        (wrapper.state('query') as RuleGroupCondition).conditions.length,
      ).toBe(0);
    });
    it('prop change', () => {
      const ruleGroup = wrapper.find('RuleGroup');
      const onPropChange = (ruleGroup.props() as RuleGroupProps).onPropChange;
      onPropChange('combinator', 'or', '1');
      expect(findCondition).toHaveBeenCalled();
      expect(props.onQueryChange).toHaveBeenCalled();
      expect((wrapper.state('query') as RuleGroupCondition).combinator).toBe(
        'or',
      );
    });
  });

  describe('throws ConditionNotFound on', () => {
    it('onAdd', () => {
      const ruleGroup = wrapper.find('RuleGroup');
      const onAdd = (ruleGroup.props() as RuleGroupProps).onAdd;
      const onAddError = (): void =>
        onAdd(
          {
            id: '2',
            combinator: 'and',
            conditions: [],
          },
          '',
        );
      expect(onAddError).toThrowError();
    });
    it('onRemove', () => {
      const ruleGroup = wrapper.find('RuleGroup');
      const onRemove = (ruleGroup.props() as RuleGroupProps).onRemove;
      const onRemoveError = (): void => onRemove('');
      expect(onRemoveError).toThrowError();
    });
    it('onPropChange', () => {
      const ruleGroup = wrapper.find('RuleGroup');
      const onPropChange = (ruleGroup.props() as RuleGroupProps).onPropChange;
      const onPropChangeError = (): void => onPropChange('a', 'b', '');
      expect(onPropChangeError).toThrowError();
    });
  });
});
