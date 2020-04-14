import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ValueComboBox } from '../../src';

configure({ adapter: new Adapter() });

jest.mock('lodash/debounce', () => (fn: any): any => (value: any): any =>
  fn(value),
);

describe('it', () => {
  let props: any;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      className: 'ValueComboBox',
      value: 'value',
      defaultValue: '',
      debounceTime: 1,
      options: ['First Name', 'Last Name', 'Address'],
    };
  });

  describe('renders', () => {
    it('without crashing with mapInput', () => {
      props.condition = jest.fn(() => true);
      props.mapInput = jest.fn((arg: any) => arg + '1');
      wrapper = shallow(<ValueComboBox {...props} />);
      wrapper.exists();
      expect(props.mapInput).toBeCalledTimes(4);
      const input = wrapper.find('input');
      expect(input.prop('value')).toBe('value1');
    });

    it('without crashing without mapInput', () => {
      props.condition = jest.fn(() => true);
      wrapper = shallow(<ValueComboBox {...props} />);
      wrapper.exists();
      const input = wrapper.find('input');
      expect(input.prop('value')).toBe('value');
    });

    it('renders null if condition is false', () => {
      props.condition = jest.fn(() => false);
      wrapper = shallow(<ValueComboBox {...props} />);
      expect(wrapper.getElement()).toBeNull();
    });

    it('without option list', () => {
      props.condition = jest.fn(() => true);
      wrapper = shallow(<ValueComboBox {...props} />);
      expect(wrapper.children().length).toBe(1);
    });

    it('with option list', () => {
      props.value = '';
      props.condition = jest.fn(() => true);
      wrapper = shallow(<ValueComboBox {...props} />);
      wrapper.find('input').simulate('focus');
      expect(wrapper.children().length).toBe(2);
      const uList = wrapper.find('ul');
      expect(uList.children().length).toBe(3);
    });

    it('without option list after onBlur', () => {
      props.condition = jest.fn(() => true);
      wrapper = shallow(<ValueComboBox {...props} />);
      wrapper.find('input').simulate('focus');
      const uList = wrapper.find('ul');
      expect(uList.exists()).toBeTruthy();
      wrapper.find('input').simulate('blur');
      expect(wrapper.children().length).toBe(1);
    });
  });

  describe('calls onChange', () => {
    it('with mapOutput', () => {
      props.condition = jest.fn(() => true);
      props.mapOutput = jest.fn((arg: any) => arg.replace('g', '3'));
      wrapper = shallow(<ValueComboBox {...props} />);
      wrapper
        .find('input')
        .simulate('change', { currentTarget: { value: 'abcdefg' } });
      expect(props.mapOutput).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledWith('abcdef3');
    });

    it('without mapOutput', () => {
      props.condition = jest.fn(() => true);
      wrapper = shallow(<ValueComboBox {...props} />);
      wrapper
        .find('input')
        .simulate('change', { currentTarget: { value: 'abcdefg' } });
      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledWith('abcdefg');
    });
  });

  it('filters list', () => {
    props.condition = jest.fn(() => true);
    wrapper = shallow(<ValueComboBox {...props} />);
    wrapper
      .find('input')
      .simulate('change', { currentTarget: { value: 'Address' } });
    wrapper.find('input').simulate('focus');
    const uList = wrapper.find('ul');
    expect(uList.children().length).toBe(1);
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith('Address');
  });
});
