import classnames from 'classnames';
import debounce from 'lodash/debounce';
import React, { useCallback, useMemo, useState } from 'react';
import { IControlProps } from '../models';
import { typeCheck } from '../utils';

export const ValueComboBox: React.FC<IControlProps> = props => {
  const {
    handleOnChange,
    className,
    condition,
    value,
    mapInput,
    mapOutput,
    options = [],
    debounceTime = 500,
  } = props;

  if (condition && !condition(props)) {
    return null;
  }

  const mappedInputValue = useMemo(
    () => (mapInput ? mapInput(value, props) : value),
    [mapInput, value],
  );
  const [inputValue, setInputValue] = useState<string>(mappedInputValue);
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = useCallback(() => setShowOptions(!showOptions), [
    showOptions,
  ]);

  const mappedHandleOnChange = useCallback(
    (outputValue: any) =>
      mapOutput
        ? handleOnChange(mapOutput(outputValue, props))
        : handleOnChange(outputValue),
    [handleOnChange, mapOutput],
  );

  const debounceWrapper = useCallback(
    debounce(mappedHandleOnChange, debounceTime),
    [],
  );

  const handleOnChangeWrapper = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;
      setInputValue(newValue);
      debounceWrapper(newValue);
    },
    [debounceWrapper],
  );

  const handleOnSelect = useCallback(
    (option: any): void => {
      setInputValue(option);
      mappedHandleOnChange(option);
    },
    [mappedHandleOnChange],
  );

  const filteredOptionsList = useCallback(() => {
    return options
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
        type={'text'}
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
