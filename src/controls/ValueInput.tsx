import classnames from 'classnames';
import debounce from 'lodash/debounce';
import * as React from 'react';
import { ControlElementProps, InputType, SystemControlProps } from '../models';
import { typeCheck } from '../utils';

export interface ValueInputControlProps extends ControlElementProps {
  debounceTime?: number;
  inputType?: InputType;
  label?: string;
}

export type ValueInputProps = ValueInputControlProps & SystemControlProps;

export const ValueInput: React.FC<ValueInputProps> = props => {
  const {
    onChange,
    className,
    condition,
    value,
    mapInput,
    mapOutput,
    debounceTime,
    inputType = 'text',
    label,
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

  const [inputValue, setInputValue] = React.useState(mappedInputValue);
  React.useEffect(() => {
    setInputValue(mappedInputValue);
  }, [incomingValue]);

  const mappedHandleOnChange = React.useCallback(
    (outputValue: any) =>
      mapOutput
        ? onChange(mapOutput(outputValue, props))
        : onChange(outputValue),
    [onChange, mapOutput],
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
      placeholder={label}
    />
  );
};

export default ValueInput;
