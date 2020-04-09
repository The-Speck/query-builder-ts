import classnames from 'classnames';
import isNil from 'lodash/isNil';
import * as React from 'react';
import {
  ActionTypes,
  Condition,
  ControlElement,
  ControlProps,
  OnAdd,
  OnChange,
  OnElementChange,
  OnPropChange,
  OnRemove,
  QueryBuilderClassNames,
  RuleCondition,
  RuleGroupCondition,
} from './models';
import { QueryBuilderState } from './QueryBuilder';
import Rule from './Rule';
import {
  createRule,
  createRuleGroup,
  isRuleGroup,
  sortElements,
  typeCheck,
} from './utils';

export interface RuleGroupProps extends QueryBuilderState {
  columns?: any[];
  group: RuleGroupCondition;
  level: number;
  rules: ControlElement[];
  ruleGroups: ControlElement[];
  classNames: QueryBuilderClassNames;
  onAdd: OnAdd;
  onRemove: OnRemove;
  onPropChange: OnPropChange;
}

interface RuleGroupElementAttributes extends React.Attributes, ControlProps {}

export class RuleGroup extends React.Component<RuleGroupProps> {
  constructor(props: RuleGroupProps) {
    super(props);

    this.addRule = this.addRule.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
    this.onElementChange = this.onElementChange.bind(this);
  }

  render(): React.ReactNode {
    const { group, classNames } = this.props;
    const conditions = this.sortConditions(group.conditions);

    return (
      <div className={classnames(typeCheck(classNames.ruleGroup, this.props))}>
        <div
          className={classnames(
            typeCheck(classNames.ruleGroupRow, this.props),
          )}>
          {this.createComponents()}
        </div>
        {this.createChildren(conditions)}
      </div>
    );
  }

  private createComponents(): React.ReactNode {
    const elements = sortElements(this.props.ruleGroups);

    return elements.map((element: ControlElement, idx: number) =>
      React.createElement(element.component, {
        ...element.props,
        element,
        key: idx,
        onChange: this.assignOnChange(element),
        parentProps: { ...this.props },
        options: this.extractOptions(element),
        value: this.props.group[element.name],
      } as RuleGroupElementAttributes),
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

  private createChildren(conditions: Condition[]): React.ReactNode {
    return conditions.map((condition: Condition, idx: number) => {
      return isRuleGroup(condition) ? (
        <RuleGroup
          {...this.props}
          key={idx}
          group={condition as RuleGroupCondition}
          level={this.props.level + 1}
        />
      ) : (
        <Rule key={idx} rule={condition as RuleCondition} {...this.props} />
      );
    });
  }

  // Using '===' because nothing should change if both are true or false.
  private sortConditions(conditions: Condition[]): Condition[] {
    return conditions.sort((a: Condition, b: Condition) =>
      isRuleGroup(a) === isRuleGroup(b) ? 0 : isRuleGroup(a) ? 1 : -1,
    );
  }

  private assignOnChange({ name }: ControlElement): OnChange | undefined {
    switch (name) {
      case ActionTypes.ADD_GROUP:
        return this.addGroup;
      case ActionTypes.ADD_RULE:
        return this.addRule;
      case ActionTypes.REMOVE_GROUP:
        return this.removeGroup;
      default:
        if (!isNil(name)) {
          return this.onElementChange(name);
        }
        return undefined;
    }
  }

  private addRule(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    const { rules, group, onAdd } = this.props;
    const newRule = createRule(rules);
    onAdd(newRule, group.id);
  }

  private addGroup(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    const { ruleGroups, group, onAdd } = this.props;
    const newGroup = createRuleGroup(ruleGroups);
    onAdd(newGroup, group.id);
  }

  private removeGroup(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    const { group, onRemove } = this.props;
    onRemove(group.id);
  }

  private onElementChange(property: string): OnElementChange {
    const { group, onPropChange } = this.props;

    return (value: any): void => onPropChange(property, value, group.id);
  }
}

export default RuleGroup;
