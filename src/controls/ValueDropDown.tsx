import classnames from 'classnames';
import isNil from 'lodash/isNil';
import React, { useCallback, useMemo } from 'react';
import { IControlProps } from '../models';

export const ValueDropDown: React.FC<IControlProps> = props => {
  const { options, handleOnChange, className, condition, value } = props;

  if (condition && !condition(props)) {
    return null;
  }

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

  const handleOnChangeWrapper = useCallback(
    (event: React.FormEvent<HTMLSelectElement>): void =>
      handleOnChange(event.currentTarget.value),
    [handleOnChange],
  );

  return (
    <select
      className={classnames(className)}
      onChange={handleOnChangeWrapper}
      value={value}>
      {dropdownOptions}
    </select>
  );
};

export default ValueDropDown;
