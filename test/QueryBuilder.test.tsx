import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import QueryBuilder from '../src/index';
import {
  ClassNames,
  IRuleGroup,
  RuleElements,
  RuleGroupElements,
} from '../src/models';
import { IQueryBuilderProps } from '../src/QueryBuilder';
import {
  createInitialClassNames,
  createInitialQuery,
  createInitialRuleElements,
  createInitialRuleGroupElements,
} from '../src/utils';

configure({ adapter: new Adapter() });

jest.mock('../src/utils', () => ({
  createInitialClassNames: jest.fn((_: ClassNames) => ({
    queryBuilder: 'classNames',
  })),
  createInitialRuleElements: jest.fn((_1: any[], _2: RuleElements) => 'rule'),
  createInitialRuleGroupElements: jest.fn(
    (_: RuleGroupElements) => 'ruleGroups',
  ),
  createInitialQuery: jest.fn((_1: RuleGroupElements, _2: RuleElements) => ({
    id: 1,
    combinator: 'and',
    conditions: [],
  })),
  typeCheck: jest.fn(),
}));

describe('it', () => {
  let props: IQueryBuilderProps;
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
      const query: IRuleGroup = wrapper.state('query');
      expect(query.id).toBe(1);
    });
  });

  describe('creates', () => {
    it('classNames', () => {
      expect(createInitialClassNames).toHaveBeenCalled();
    });
    it('rule elements', () => {
      expect(createInitialRuleElements).toHaveBeenCalled();
    });
    it('rule group elements', () => {
      expect(createInitialRuleGroupElements).toHaveBeenCalled();
    });
    it('initialized state', () => {
      expect(createInitialQuery).toHaveBeenCalled();
    });
  });
});
