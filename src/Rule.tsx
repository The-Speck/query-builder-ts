import classnames from 'classnames';
import isNil from 'lodash/isNil';
import * as React from 'react';
import {
  ActionTypes,
  ControlElement,
  ControlProps,
  OnChange,
  OnElementChange,
  OnPropChange,
  OnRemove,
  QueryBuilderClassNames,
  RuleCondition,
} from './models';
import { QueryBuilderState } from './QueryBuilder';
import { sortElements, typeCheck } from './utils';

export interface RuleProps extends QueryBuilderState {
  columns?: any[];
  rule: RuleCondition;
  rules: ControlElement[];
  classNames: QueryBuilderClassNames;
  onRemove: OnRemove;
  onPropChange: OnPropChange;
}

interface RuleElementAttributes extends React.Attributes, ControlProps {}

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
    const elements = sortElements(this.props.rules);

    return elements.map((element: ControlElement, idx: number) =>
      React.createElement(element.component, {
        ...element.props,
        element,
        key: idx,
        onChange: this.assignOnChange(element),
        parentProps: { ...this.props },
        options: this.extractOptions(element),
        value: this.props.rule[element.name],
      } as RuleElementAttributes),
    );
  }

  private extractOptions(element: ControlElement): any[] | undefined {
    if (element.isColumn) {
      return (
        element.props && (element.props.options || this.props.columns || [])
      );
    }
    return element.props && element.props.options;
  }

  private assignOnChange({ name }: ControlElement): OnChange | undefined {
    switch (name) {
      case ActionTypes.REMOVE_RULE:
        return this.removeRule;
      default:
        if (!isNil(name)) {
          return this.onElementChange(name);
        }
        return undefined;
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
