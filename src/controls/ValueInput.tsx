import classnames from 'classnames';
import debounce from 'lodash/debounce';
import React, { useCallback, useState } from 'react';

export const ValueInput: React.FC<any> = props => {
  const {
    handleOnChange,
    className,
    condition,
    value,
    debounceTime = 500,
    inputType = 'text',
  } = props;

  if (condition && !condition(props)) {
    return null;
  }

  const [inputValue, setInputValue] = useState(value);

  const debounceWrapper = useCallback(debounce(handleOnChange, debounceTime), [
    inputValue,
  ]);

  const handleOnChangeWrapper = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setInputValue(event.currentTarget.value);
      debounceWrapper(event.currentTarget.value);
    },
    [],
  );

  return (
    <input
      className={classnames(className)}
      onChange={handleOnChangeWrapper}
      type={inputType}
      value={inputValue}
    />
  );
};

export default ValueInput;
