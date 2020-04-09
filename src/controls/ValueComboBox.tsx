import classnames from 'classnames';
import debounce from 'lodash/debounce';
import * as React from 'react';
import { ControlElementProps, InputType, SystemControlProps } from '../models';
import { typeCheck } from '../utils';

export interface ValueComboBoxControlProps extends ControlElementProps {
  debounceTime?: number;
  inputType?: InputType;
}

export type ValueComboBoxProps = ValueComboBoxControlProps & SystemControlProps;

export const ValueComboBox: React.FC<ValueComboBoxProps> = props => {
  const {
    onChange,
    className,
    condition,
    value,
    mapInput,
    mapOutput,
    options,
    debounceTime,
    inputType = 'text',
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
  const [inputValue, setInputValue] = React.useState<string>(mappedInputValue);
  const [showOptions, setShowOptions] = React.useState(false);

  React.useEffect(() => {
    setInputValue(mappedInputValue);
  }, [incomingValue]);

  const toggleShowOptions = React.useCallback(
    () => setShowOptions(!showOptions),
    [showOptions],
  );

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

  const handleOnSelect = React.useCallback(
    (option: any): void => {
      setInputValue(option);
      mappedHandleOnChange(option);
    },
    [mappedHandleOnChange],
  );

  const filteredOptionsList = React.useMemo(() => {
    const availableOptions = options || [];
    const mappedOptions = mapInput
      ? availableOptions.map((o: any) => mapInput(o, props))
      : availableOptions;
    return mappedOptions
      .filter(
        (option: any) =>
          option.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
      )
      .map((option: any, idx: number) => (
        <li
          key={idx}
          className={classnames(typeCheck(className, 'li', props))}
          onMouseDown={(): void => handleOnSelect(option)}>
          {option}
        </li>
      ));
  }, [inputValue, options, handleOnSelect]);

  return (
    <div className={classnames(typeCheck(className, 'container', props))}>
      <input
        className={classnames(typeCheck(className, 'input', props))}
        onChange={handleOnChangeWrapper}
        type={typeCheck(inputType, value, props)}
        onFocus={toggleShowOptions}
        onBlur={toggleShowOptions}
        value={inputValue}
      />
      {showOptions ? (
        <div
          className={classnames(
            typeCheck(className, 'dropdownContainer', props),
          )}>
          <ul className={classnames(typeCheck(className, 'ul', props))}>
            {filteredOptionsList}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default ValueComboBox;
