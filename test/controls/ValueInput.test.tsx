import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ValueInput } from '../../src';

configure({ adapter: new Adapter() });

describe('it', () => {
  let props: any;
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    props = {
      handleOnChange: jest.fn(),
      className: 'ValueInput',
      value: 'value',
      debounceTime: 0,
    };
  });

  describe('renders', () => {
    it('without crashing with mapInput', () => {
      props.condition = jest.fn(() => true);
      props.mapInput = jest.fn((arg: any) => arg);
      wrapper = shallow(<ValueInput {...props} />);
      wrapper.exists();
    });

    it('without crashing without mapInput', () => {
      props.condition = jest.fn(() => true);
      wrapper = shallow(<ValueInput {...props} />);
      wrapper.exists();
    });

    it('renders null if condition is false', () => {
      props.condition = jest.fn(() => false);
      wrapper = shallow(<ValueInput {...props} />);
      expect(wrapper.getElement()).toBeNull();
    });
  });

  // describe('calls handleOnChange', () => {
  //   it('with mapOutput', () => {
  //     props.condition = jest.fn(() => true);
  //     props.mapOutput = jest.fn((arg: any) => arg);
  //     wrapper = shallow(<ValueInput {...props} />);
  //     wrapper.find('input', )
  //     expect(props.mapOutput).toHaveBeenCalledTimes(1);
  //     expect(props.handleOnChange).toHaveBeenCalledTimes(1);
  //   });

  //   it('without mapOutput', () => {
  //     props.condition = jest.fn(() => true);
  //     wrapper = shallow(<ValueInput {...props} />);
  //     wrapper
  //       .find('select')
  //       .simulate('change', { currentTarget: { value: 'value2' } });
  //     expect(props.handleOnChange).toHaveBeenCalledTimes(1);
  //   });
  // });
});
