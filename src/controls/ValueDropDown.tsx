import classnames from 'classnames';
import isNil from 'lodash/isNil';
import React, { useMemo } from 'react';
import { ControlElement, handleOnChange } from '../models';
import { IRuleProps } from '../Rule';
import { IRuleGroupProps } from '../RuleGroup';

export interface IValueDropDown extends ControlElement {
  handleOnChange: handleOnChange;
  parentProps: IRuleGroupProps | IRuleProps;
  value: any;
}

export const ValueDropDown: React.FC<IValueDropDown> = props => {
  const { options } = props;

  const dropdownOptions = useMemo(() => {
    if (isNil(options)) {
      return [];
    }
    return options.map((option: any, idx: number) => (
      <option key={idx} value={option.name}>
        {option.label}
      </option>
    ));
  }, [options]);

  return (
    <select className={classnames('dropdown', props.className)}>
      {dropdownOptions}
    </select>
  );
};

export default ValueDropDown;
