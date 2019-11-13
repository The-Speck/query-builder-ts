import classnames from 'classnames';
import isNil from 'lodash/isNil';
import React, { useMemo } from 'react';
import { IControlProps } from '../models';

export const ValueDropDown: React.FC<IControlProps> = props => {
  const { options, handleOnChange, className } = props;

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
    <select className={classnames(className)} onChange={handleOnChange}>
      {dropdownOptions}
    </select>
  );
};

export default ValueDropDown;
