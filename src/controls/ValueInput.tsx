import classnames from 'classnames';
import debounce from 'lodash/debounce';
import React, { useCallback } from 'react';

export const ValueInput: React.FC<any> = props => {
  const {
    handleOnChange,
    className,
    condition,
    debounceTime = 500,
    inputType = 'string',
  } = props;

  if (condition && !condition(props)) {
    return null;
  }

  const debounceWrapper = useCallback(debounce(handleOnChange, debounceTime), [
    handleOnChange,
  ]);

  const handleOnChangeWrapper = useCallback(
    (event: React.FormEvent<HTMLInputElement>) =>
      debounceWrapper(event.currentTarget.value),
    [debounceWrapper],
  );

  return (
    <input
      className={classnames(className)}
      onChange={handleOnChangeWrapper}
      type={inputType}
    />
  );
};

export default ValueInput;
