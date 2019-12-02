import classnames from 'classnames';
import isNil from 'lodash/isNil';
import * as React from 'react';
import { ControlProps } from '../models';
import { typeCheck } from '../utils';

export const ValueDropDown: React.FC<ControlProps> = props => {
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

  const mappedInputValue = React.useMemo(
    () => (mapInput ? mapInput(value, props) : value),
    [mapInput, value],
  );

  const dropdownOptions = React.useMemo(() => {
    if (isNil(options)) {
      return [];
    }
    return options.map((option: any, idx: number) => (
      <option
        key={idx}
        value={option.name}
        className={classnames(typeCheck(className, 'option'))}>
        {option.label}
      </option>
    ));
  }, [options]);

  const handleOnChangeWrapper = React.useCallback(
    (event: React.FormEvent<HTMLSelectElement>): void => {
      const newValue = event.currentTarget.value;
      const mappedOutValue = mapOutput ? mapOutput(newValue, props) : newValue;
      handleOnChange(mappedOutValue);
    },
    [handleOnChange, mapOutput],
  );

  return (
    <select
      className={classnames(typeCheck(className, 'select'))}
      onChange={handleOnChangeWrapper}
      value={mappedInputValue}>
      {dropdownOptions}
    </select>
  );
};

export default ValueDropDown;
