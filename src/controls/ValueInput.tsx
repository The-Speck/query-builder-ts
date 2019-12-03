import classnames from 'classnames';
import debounce from 'lodash/debounce';
import * as React from 'react';
import { ControlProps } from '../models';
import { typeCheck } from '../utils';

export const ValueInput: React.FC<ControlProps> = props => {
  const {
    handleOnChange,
    className,
    condition,
    value,
    mapInput,
    mapOutput,
    debounceTime,
    inputType = 'text',
  } = props;

  if (condition && !condition(props)) {
    return null;
  }

  const mappedInputValue = React.useMemo(
    () => (mapInput ? mapInput(value, props) : value),
    [mapInput, value],
  );

  const [inputValue, setInputValue] = React.useState(mappedInputValue);

  React.useEffect(() => {
    setInputValue(mappedInputValue);
  }, [value]);

  const mappedHandleOnChange = React.useCallback(
    (outputValue: any) =>
      mapOutput
        ? handleOnChange(mapOutput(outputValue, props))
        : handleOnChange(outputValue),
    [handleOnChange, mapOutput],
  );

  const debounceWrapper = React.useCallback(
    debounce(mappedHandleOnChange, debounceTime || 500),
    [mappedHandleOnChange],
  );

  const handleOnChangeWrapper = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;
      setInputValue(newValue);
      debounceWrapper(newValue);
    },
    [debounceWrapper],
  );

  return (
    <input
      className={classnames(typeCheck(className, 'input', props))}
      onChange={handleOnChangeWrapper}
      type={typeCheck(inputType, value, props)}
      value={inputValue}
    />
  );
};

export default ValueInput;
