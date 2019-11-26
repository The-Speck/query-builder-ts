import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import QueryBuilder from '../src/index';
import { IQueryBuilderProps } from '../src/QueryBuilder';

describe('it', () => {
  let props: IQueryBuilderProps;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    props = {
      columns: ['apple', 'water', 'dog'],
    };

    wrapper = shallow(<QueryBuilder {...props} />);
  });

  it('renders without crashing', () => {
    wrapper.exists();
  });

  // describe('creates default', () => {
  //   it('classNames', () => {
  //     wrapper.props;
  //   });
  // });
});
