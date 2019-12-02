import classnames from 'classnames';
import * as React from 'react';
import {
  ControlElement,
  HandleOnChange,
  OnElementChange,
  OnPropChange,
  OnRemove,
  QueryBuilderClassNames,
  RuleCondition,
  RuleElements,
} from './models';
import { QueryBuilderState } from './QueryBuilder';
import { createSortedElements, typeCheck } from './utils';

export interface RuleProps extends QueryBuilderState {
  rule: RuleCondition;
  rules: RuleElements;
  classNames: QueryBuilderClassNames;
  onRemove: OnRemove;
  onPropChange: OnPropChange;
}

export interface RuleElementAttributes extends React.Attributes {
  handleOnChange: HandleOnChange;
  parentProps: RuleProps;
  value: any;
}

export class Rule extends React.Component<RuleProps> {
  constructor(props: RuleProps) {
    super(props);

    this.removeRule = this.removeRule.bind(this);
    this.onElementChange = this.onElementChange.bind(this);
  }

  render(): React.ReactNode {
    const { classNames } = this.props;

    return (
      <div className={classnames(typeCheck(classNames.ruleRow, this.props))}>
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
      } as RuleElementAttributes),
    );
  }

  private setValue(element: ControlElement): any {
    const currentValue = (this.props.rule as any)[element.name];
    if (currentValue === undefined) {
      return element.defaultValue;
    }
    return currentValue;
  }

  private assignOnChange(element: ControlElement): HandleOnChange {
    switch (element.name) {
      case this.props.rules.removeRuleAction.name:
        return this.removeRule;
      default:
        return this.onElementChange(element.name);
    }
  }

  private removeRule(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    const { rule, onRemove } = this.props;
    onRemove(rule.id);
  }

  private onElementChange(property: string): OnElementChange {
    const { rule, onPropChange } = this.props;

    return (value: any): void => onPropChange(property, value, rule.id);
  }
}

export default Rule;
