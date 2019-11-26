import classnames from 'classnames';
import React, { Attributes } from 'react';
import {
  ClassNames,
  ControlElement,
  IRule,
  IRuleGroup,
  RuleElements,
  RuleGroupElements,
  TCondition,
  THandleOnChange,
  TOnAdd,
  TOnElementChange,
  TOnPropChange,
  TOnRemove,
} from './models';
import { IQueryBuilderState } from './QueryBuilder';
import Rule from './Rule';
import {
  createRule,
  createRuleGroup,
  createSortedElements,
  isRuleGroup,
  typeCheck,
} from './utils';

export interface IRuleGroupProps extends IQueryBuilderState {
  group: IRuleGroup;
  level: number;
  rules: RuleElements;
  ruleGroups: RuleGroupElements;
  classNames: ClassNames;
  onAdd: TOnAdd;
  onRemove: TOnRemove;
  onPropChange: TOnPropChange;
}

export interface IRuleGroupElementAttributes extends Attributes {
  handleOnChange: THandleOnChange;
  parentProps: IRuleGroupProps;
  value: any;
}

export class RuleGroup extends React.Component<IRuleGroupProps> {
  constructor(props: IRuleGroupProps) {
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
    const elements = createSortedElements(this.props.ruleGroups);

    return elements.map((element: ControlElement, idx: number) =>
      React.createElement(element.component, {
        key: idx,
        handleOnChange: this.setOnChange(element),
        parentProps: { ...this.props },
        ...element,
        value: this.setValue(element),
      } as IRuleGroupElementAttributes),
    );
  }

  private createChildren(conditions: TCondition[]): React.ReactNode {
    return conditions.map((condition: TCondition, idx: number) => {
      return isRuleGroup(condition) ? (
        <RuleGroup
          {...this.props}
          key={idx}
          group={condition as IRuleGroup}
          level={this.props.level + 1}
        />
      ) : (
        <Rule key={idx} rule={condition as IRule} {...this.props} />
      );
    });
  }

  // Using '===' because nothing should change if both are true or false.
  private sortConditions(conditions: TCondition[]): TCondition[] {
    return conditions.sort((a: TCondition, b: TCondition) =>
      isRuleGroup(a) === isRuleGroup(b) ? 0 : isRuleGroup(a) ? 1 : -1,
    );
  }

  private setValue(element: ControlElement): any {
    const currentValue = (this.props.group as any)[element.name];
    if (currentValue === undefined) {
      return element.defaultValue;
    }
    return currentValue;
  }

  private setOnChange({ name }: ControlElement): THandleOnChange {
    const { ruleGroups } = this.props;

    switch (name) {
      case ruleGroups.addGroupAction.name:
        return this.addGroup;
      case ruleGroups.addRuleAction.name:
        return this.addRule;
      case ruleGroups.removeGroupAction.name:
        return this.removeGroup;
      default:
        return this.onElementChange(name);
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

  private onElementChange(property: string): TOnElementChange {
    const { group, onPropChange } = this.props;

    return (value: any): void => onPropChange(property, value, group.id);
  }
}

export default RuleGroup;
