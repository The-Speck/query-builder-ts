import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ValueDropDown } from '../../src';

configure({ adapter: new Adapter() });

describe('it', () => {
  let props: any;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    props = {
      options: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
      ],
      value: 'value',
      defaultValue: null,
      onChange: jest.fn(),
      className: 'ValueDropDown',
    };
  });

  describe('renders', () => {
    it('without crashing with mapInput', () => {
      props.condition = jest.fn(() => true);
      props.mapInput = jest.fn((arg: any) => arg + '1');
      wrapper = shallow(<ValueDropDown {...props} />);
      wrapper.exists();
      expect(props.mapInput).toHaveBeenCalled();
      expect(wrapper.prop('value')).toBe('value1');
    });

    it('without crashing without mapInput', () => {
      props.condition = jest.fn(() => true);
      wrapper = shallow(<ValueDropDown {...props} />);
      wrapper.exists();
      expect(wrapper.prop('value')).toBe('value');
    });

    it('renders null if condition is false', () => {
      props.condition = jest.fn(() => false);
      wrapper = shallow(<ValueDropDown {...props} />);
      expect(wrapper.getElement()).toBeNull();
    });
  });

  describe('calls onChange', () => {
    it('with mapOutput', () => {
      props.condition = jest.fn(() => true);
      props.mapOutput = jest.fn((arg: any) => arg.replace('2', '3'));
      wrapper = shallow(<ValueDropDown {...props} />);
      wrapper
        .find('select')
        .simulate('change', { currentTarget: { value: 'value2' } });
      expect(props.mapOutput).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledWith('value3');
    });

    it('without mapOutput', () => {
      props.condition = jest.fn(() => true);
      wrapper = shallow(<ValueDropDown {...props} />);
      wrapper
        .find('select')
        .simulate('change', { currentTarget: { value: 'value2' } });
      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledWith('value2');
    });
  });
});
