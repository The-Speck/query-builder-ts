import classNames from 'classnames';
import * as React from 'react';
import { ControlProps } from '../models';
import { typeCheck } from '../utils';

export const ActionButton: React.FC<ControlProps> = props => {
  const { handleOnChange, className, label, condition } = props;

  if (condition && !condition(props)) {
    return null;
  }

  return (
    <button
      className={classNames(typeCheck(className, 'button', props))}
      onClick={handleOnChange}>
      {label}
    </button>
  );
};

export default ActionButton;
