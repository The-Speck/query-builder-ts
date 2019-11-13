import classNames from 'classnames';
import React from 'react';
import { IControlProps } from '../models';

export const ActionButton: React.FC<IControlProps> = props => {
  const { handleOnChange, className, label } = props;

  return (
    <button className={classNames(className)} onClick={handleOnChange}>
      {label}
    </button>
  );
};

export default ActionButton;
