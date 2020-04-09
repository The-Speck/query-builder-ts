import classnames from 'classnames';
import isNil from 'lodash/isNil';
import * as React from 'react';
import { ControlProps } from '../models';
import { typeCheck } from '../utils';

export const ValueDropDown: React.FC<ControlProps> = props => {
  const {
    options,
    onChange,
    className,
    condition,
    value,
    mapInput,
    mapOutput,
    defaultValue,
  } = props;

  if (condition && !condition(props)) {
    return null;
  }

  const incomingValue = value || defaultValue;
  const mappedInputValue = React.useMemo(
    () => (mapInput ? mapInput(incomingValue, props) : incomingValue),
    [mapInput, incomingValue],
  );

  const dropdownOptions = React.useMemo(() => {
    if (isNil(options)) {
      return [];
    }
    return options.map((option: any, idx: number) => {
      const mappedOption = mapInput ? mapInput(option, props) : option;

      return (
        <option
          key={idx}
          value={mappedOption.name}
          className={classnames(typeCheck(className, 'option', props))}>
          {mappedOption.label}
        </option>
      );
    });
  }, [options]);

  const handleOnChangeWrapper = React.useCallback(
    (event: React.FormEvent<HTMLSelectElement>): void => {
      const newValue = event.currentTarget.value;
      const mappedOutValue = mapOutput ? mapOutput(newValue, props) : newValue;
      onChange(mappedOutValue);
    },
    [onChange, mapOutput],
  );

  return (
    <select
      className={classnames(typeCheck(className, 'select', props))}
      onChange={handleOnChangeWrapper}
      value={mappedInputValue}>
      {dropdownOptions}
    </select>
  );
};

export default ValueDropDown;
