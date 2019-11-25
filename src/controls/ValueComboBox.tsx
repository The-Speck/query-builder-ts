import classnames from 'classnames';
import debounce from 'lodash/debounce';
import React, { useCallback, useState } from 'react';
import styles from '../style.module.css';

export const ValueComboBox: React.FC<any> = props => {
  const {
    handleOnChange,
    className,
    condition,
    debounceTime = 500,
    options,
    value,
  } = props;

  if (condition && !condition(props)) {
    return null;
  }

  const [inputValue, setInputValue] = useState(value);
  const [showOptions, setShowOptions] = useState(false);

  const toggleShowOptions = useCallback(() => setShowOptions(!showOptions), [
    showOptions,
  ]);

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

  const handleOneSelect = useCallback(
    (option: any): void => {
      setInputValue(option);
      handleOnChange(option);
    },
    [handleOnChange],
  );

  const filteredOptionsList = useCallback(() => {
    return options
      .filter(
        (option: any) => option.toLowerCase().indexOf(value.toLowerCase()) > -1,
      )
      .map((option: any, idx: number) => (
        <li
          key={idx}
          id={'filteredOptionsItem'}
          className={styles.filteredOptionsItem}
          onMouseDown={(): void => handleOneSelect(option)}>
          {option}
        </li>
      ));
  }, [value, options]);

  return (
    <>
      <input
        className={classnames(className)}
        onChange={handleOnChangeWrapper}
        type={'text'}
        onFocus={toggleShowOptions}
        onBlur={toggleShowOptions}
        value={inputValue}
      />
      {showOptions ? (
        <div
          id={'filteredOptionsContainer'}
          className={styles.filteredOptionsContainer}>
          <ul id={'filteredOptionsList'} className={styles.filteredOptionsList}>
            {filteredOptionsList()}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default ValueComboBox;
