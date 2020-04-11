import classnames from 'classnames';
import isNil from 'lodash/isNil';
import * as React from 'react';
import {
  ActionTypes,
  ControlElementProps,
  ControlProps,
  OnChange,
  OnElementChange,
  OnPropChange,
  OnRemove,
  QueryBuilderClassNames,
  RuleCondition,
  RuleElement,
} from './models';
import { QueryBuilderState } from './QueryBuilder';
import { typeCheck } from './utils';

export interface RuleProps extends QueryBuilderState {
  columns?: any[];
  rule: RuleCondition;
  rules: RuleElement[];
  classNames: QueryBuilderClassNames;
  onRemove: OnRemove;
  onPropChange: OnPropChange;
}

export interface RuleElementAttributes extends React.Attributes, ControlProps {}

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
    return this.props.rules.map((element: RuleElement, idx: number) =>
      React.createElement(element.component, {
        ...element.props,
        element,
        key: idx,
        onChange: this.assignOnChangeWrapper(element),
        parentProps: { ...this.props },
        options: this.extractOptions(element),
        value: this.props.rule[element.name],
      } as RuleElementAttributes),
    );
  }

  private extractOptions(element: RuleElement): any[] | undefined {
    if (element.isColumn) {
      return (
        element.props && (element.props.options || this.props.columns || [])
      );
    }
    return element.props && element.props.options;
  }

  private assignOnChangeWrapper({
    name,
    props,
  }: RuleElement): OnChange | undefined {
    switch (name) {
      case ActionTypes.REMOVE_RULE:
        return this.removeRule;
      default:
        if (!isNil(name)) {
          return this.onElementChange(name, props);
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

  private onElementChange(
    property: string,
    props?: ControlElementProps,
  ): OnElementChange {
    const { rule, onPropChange } = this.props;
    const onChange = props && props.onChange;

    return (value: any): void => {
      onChange && onChange(value);
      onPropChange(property, value, rule.id);
    };
  }
}

export default Rule;
