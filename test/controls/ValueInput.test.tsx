import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ValueInput } from '../../src';

configure({ adapter: new Adapter() });

jest.mock('lodash/debounce', () => (fn: any): any => (value: any): any =>
  fn(value),
);

describe('it', () => {
  let props: any;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    props = {
      handleOnChange: jest.fn(),
      className: 'ValueInput',
      value: 'value',
      debounceTime: 1,
    };
  });

  describe('renders', () => {
    it('without crashing with mapInput', () => {
      props.condition = jest.fn(() => true);
      props.mapInput = jest.fn((arg: any) => arg + '1');
      wrapper = shallow(<ValueInput {...props} />);
      wrapper.exists();
      expect(props.mapInput).toBeCalledTimes(1);
      expect(wrapper.prop('value')).toBe('value1');
    });

    it('without crashing without mapInput', () => {
      props.condition = jest.fn(() => true);
      wrapper = shallow(<ValueInput {...props} />);
      wrapper.exists();
      expect(wrapper.prop('value')).toBe('value');
    });

    it('renders null if condition is false', () => {
      props.condition = jest.fn(() => false);
      wrapper = shallow(<ValueInput {...props} />);
      expect(wrapper.getElement()).toBeNull();
    });
  });

  describe('calls handleOnChange', () => {
    it('with mapOutput', () => {
      props.condition = jest.fn(() => true);
      props.mapOutput = jest.fn((arg: any) => arg.replace('g', '3'));
      wrapper = shallow(<ValueInput {...props} />);
      wrapper
        .find('input')
        .simulate('change', { currentTarget: { value: 'abcdefg' } });
      expect(props.mapOutput).toHaveBeenCalledTimes(1);
      expect(props.handleOnChange).toHaveBeenCalledTimes(1);
      expect(props.handleOnChange).toHaveBeenCalledWith('abcdef3');
    });

    it('without mapOutput', () => {
      props.condition = jest.fn(() => true);
      wrapper = shallow(<ValueInput {...props} />);
      wrapper
        .find('input')
        .simulate('change', { currentTarget: { value: 'abcdefg' } });
      expect(props.handleOnChange).toHaveBeenCalledTimes(1);
      expect(props.handleOnChange).toHaveBeenCalledWith('abcdefg');
    });
  });
});
