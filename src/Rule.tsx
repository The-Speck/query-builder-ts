import { boundMethod } from 'autobind-decorator';
import classnames from 'classnames';
import React, { Attributes } from 'react';
import {
  ClassNames,
  ControlElement,
  handleOnChange,
  IRule,
  RuleElements,
} from './models';
import { IQueryBuilderState } from './QueryBuilder';
import { createSortedElements } from './utils';

export interface IRuleProps extends IQueryBuilderState {
  rule: IRule;
  rules: RuleElements;
  classNames: ClassNames;
}

export interface IRuleElementAttributes extends Attributes, IRuleProps {
  handleOnChange: handleOnChange;
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
        handleOnChange: this.assignOnChange(element),
        ...this.props,
      } as IRuleElementAttributes),
    );
  }

  private assignOnChange(element: ControlElement): handleOnChange {
    switch (element.name) {
      case this.props.rules.removeRuleAction.name:
        return this.removeRule;
      default:
        return this.onElementChange;
    }
  }

  @boundMethod
  private removeRule(): void {}

  @boundMethod
  private onElementChange(): void {}
}

export default Rule;
