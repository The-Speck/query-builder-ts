import classnames from 'classnames';
import React from 'react';
import { ClassNames, ControlElement, IRule, RuleElements } from './models';
import { IQueryBuilderState } from './QueryBuilder';
import { createSortedElements } from './utils';

export interface IRuleProps extends IQueryBuilderState {
  rule: IRule;
  rules: RuleElements;
  classNames: ClassNames;
}

export class Rule extends React.Component<IRuleProps> {
  render(): React.ReactNode {
    const { classNames } = this.props;

    return (
      <div className={classnames(classNames.ruleRow)}>
        {this.createComponents()}
      </div>
    );
  }

  private createComponents(): React.ReactNode {
    const elements = createSortedElements(this.props.rules);

    return elements.map((element: ControlElement, idx: number) =>
      React.createElement(element.component, {
        key: idx,
        ...this.props,
      }),
    );
  }
}

export default Rule;
