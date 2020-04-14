import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ActionButton } from '../../src';

configure({ adapter: new Adapter() });

describe('it', () => {
  let props: any;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      className: 'ActionButton',
      label: 'Button',
    };
  });

  describe('renders', () => {
    it('without crashing', () => {
      props.condition = jest.fn(() => true);
      wrapper = shallow(<ActionButton {...props} />);
      wrapper.exists();
    });

    it('renders null if condition is false', () => {
      props.condition = jest.fn(() => false);
      wrapper = shallow(<ActionButton {...props} />);
      expect(wrapper.getElement()).toBeNull();
    });
  });

  it('calls onChange when clicked', () => {
    props.condition = jest.fn(() => true);
    wrapper = shallow(<ActionButton {...props} />);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
