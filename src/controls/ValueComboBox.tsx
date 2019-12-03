import classnames from 'classnames';
import debounce from 'lodash/debounce';
import * as React from 'react';
import { ControlProps } from '../models';
import { typeCheck } from '../utils';

export const ValueComboBox: React.FC<ControlProps> = props => {
  const {
    handleOnChange,
    className,
    condition,
    value,
    mapInput,
    mapOutput,
    options,
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
  const [inputValue, setInputValue] = React.useState<string>(mappedInputValue);
  const [showOptions, setShowOptions] = React.useState(false);

  const toggleShowOptions = React.useCallback(
    () => setShowOptions(!showOptions),
    [showOptions],
  );

  const mappedHandleOnChange = React.useCallback(
    (outputValue: any) =>
      mapOutput
        ? handleOnChange(mapOutput(outputValue, props))
        : handleOnChange(outputValue),
    [handleOnChange, mapOutput],
  );

  const debounceWrapper = React.useCallback(
    debounce(mappedHandleOnChange, debounceTime || 500),
    [inputValue],
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

  const filteredOptionsList = React.useCallback(() => {
    const availableOptions = options || [];
    return availableOptions
      .filter(
        (option: any) =>
          option.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
      )
      .map((option: any, idx: number) => (
        <li
          key={idx}
          className={classnames(typeCheck(className, 'li'))}
          onMouseDown={(): void => handleOnSelect(option)}>
          {option}
        </li>
      ));
  }, [inputValue, options, handleOnSelect]);

  return (
    <>
      <input
        className={classnames(typeCheck(className, 'input'))}
        onChange={handleOnChangeWrapper}
        type={typeCheck(inputType)}
        onFocus={toggleShowOptions}
        onBlur={toggleShowOptions}
        value={inputValue}
      />
      {showOptions ? (
        <div className={typeCheck(className, 'container')}>
          <ul className={typeCheck(className, 'ul')}>
            {filteredOptionsList()}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default ValueComboBox;
