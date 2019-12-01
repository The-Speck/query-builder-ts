import classNames from 'classnames';
import React from 'react';
import { IControlProps } from '../models';
import { typeCheck } from '../utils';

export const ActionButton: React.FC<IControlProps> = props => {
  const { handleOnChange, className, label, condition } = props;

  if (condition && !condition(props)) {
    return null;
  }

  return (
    <button
      className={classNames(typeCheck(className, 'button'))}
      onClick={handleOnChange}>
      {label}
    </button>
  );
};

export default ActionButton;
