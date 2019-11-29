import classnames from 'classnames';
import debounce from 'lodash/debounce';
import React, { useCallback, useMemo, useState } from 'react';
import { IControlProps } from '../models';
import { typeCheck } from 'utils';

export const ValueInput: React.FC<IControlProps> = props => {
  const {
    handleOnChange,
    className,
    condition,
    value,
    mapInput,
    mapOutput,
    inputType = 'text',
    debounceTime = 500,
  } = props;

  if (condition && !condition(props)) {
    return null;
  }

  const mappedInputValue = useMemo(
    () => (mapInput ? mapInput(value, props) : value),
    [mapInput, value],
  );

  const [inputValue, setInputValue] = useState(mappedInputValue);

  const mappedHandleOnChange = useCallback(
    (outputValue: any) =>
      mapOutput
        ? handleOnChange(mapOutput(outputValue, props))
        : handleOnChange(outputValue),
    [handleOnChange, mapOutput],
  );

  const debounceWrapper = useCallback(
    debounce(mappedHandleOnChange, debounceTime),
    [inputValue],
  );

  const handleOnChangeWrapper = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;
      setInputValue(newValue);
      debounceWrapper(newValue);
    },
    [],
  );

  return (
    <input
      className={classnames(typeCheck(className, 'input'))}
      onChange={handleOnChangeWrapper}
      type={inputType}
      value={inputValue}
    />
  );
};

export default ValueInput;
