import { boundMethod } from 'autobind-decorator';
import classnames from 'classnames';
import React, { Attributes } from 'react';
import {
  ClassNames,
  ControlElement,
  IRule,
  RuleElements,
  THandleOnChange,
  TOnAdd,
  TOnElementChange,
  TOnPropChange,
  TOnRemove,
} from './models';
import { IQueryBuilderState } from './QueryBuilder';
import { createSortedElements } from './utils';

export interface IRuleProps extends IQueryBuilderState {
  rule: IRule;
  rules: RuleElements;
  classNames: ClassNames;
  onAdd: TOnAdd;
  onRemove: TOnRemove;
  onPropChange: TOnPropChange;
}

export interface IRuleElementAttributes extends Attributes {
  handleOnChange: THandleOnChange;
  parentProps: IRuleProps;
  value: any;
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
        parentProps: { ...this.props },
        ...element,
        value: this.setValue(element),
      } as IRuleElementAttributes),
    );
  }

  private setValue(element: ControlElement): any {
    const currentValue = (this.props.rule as any)[element.name];
    if (currentValue === undefined) {
      return element.defaultValue;
    }
    return currentValue;
  }

  private assignOnChange(element: ControlElement): THandleOnChange {
    switch (element.name) {
      case this.props.rules.removeRuleAction.name:
        return this.removeRule;
      default:
        return this.onElementChange(element.name);
    }
  }

  @boundMethod
  private removeRule(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    const { rule, onRemove } = this.props;
    onRemove(rule.id);
  }

  @boundMethod
  private onElementChange(property: string): TOnElementChange {
    const { rule, onPropChange } = this.props;

    return (value: any): void => onPropChange(property, value, rule.id);
  }
}

export default Rule;
