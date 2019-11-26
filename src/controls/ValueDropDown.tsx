import classnames from 'classnames';
import isNil from 'lodash/isNil';
import React, { useCallback, useMemo } from 'react';
import { IControlProps } from '../models';

export const ValueDropDown: React.FC<IControlProps> = props => {
  const {
    options,
    handleOnChange,
    className,
    condition,
    value,
    mapInput,
    mapOutput,
  } = props;

  if (condition && !condition(props)) {
    return null;
  }

  const mappedInputValue = useMemo(
    () => (mapInput ? mapInput(value, props) : value),
    [mapInput, value],
  );

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
    (event: React.FormEvent<HTMLSelectElement>): void => {
      const newValue = event.currentTarget.value;
      const mappedOutValue = mapOutput ? mapOutput(newValue, props) : newValue;
      handleOnChange(mappedOutValue);
    },
    [handleOnChange, mapOutput],
  );

  return (
    <select
      className={classnames(className)}
      onChange={handleOnChangeWrapper}
      value={mappedInputValue}>
      {dropdownOptions}
    </select>
  );
};

export default ValueDropDown;
