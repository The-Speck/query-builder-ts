import { boundMethod } from 'autobind-decorator';
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
  TOnElementChanged,
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
  render(): React.ReactNode {
    const { group, classNames, level } = this.props;
    const conditions = this.sortConditions(group.conditions);

    return (
      <div className={classnames(level > 0 ? classNames.ruleGroup : null)}>
        <div className={classnames(classNames.ruleGroupRow)}>
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
          onAdd={this.props.onAdd} // this may need modification
        />
      ) : (
        <Rule key={idx} rule={condition as IRule} {...this.props} />
      );
    });
  }

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
        return this.onElementChanged(name);
    }
  }

  @boundMethod
  private addRule(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    const { rules, group, onAdd } = this.props;
    const newRule = createRule(rules);
    onAdd(newRule, group.id);
  }

  @boundMethod
  private addGroup(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    const { ruleGroups, group, onAdd } = this.props;
    const newGroup = createRuleGroup(ruleGroups);
    onAdd(newGroup, group.id);
  }

  @boundMethod
  private removeGroup(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    console.log('removeGroup');
  }

  @boundMethod
  private onElementChanged(property: string): TOnElementChanged {
    const { group, onPropChange } = this.props;

    return (value: any): void => onPropChange(property, value, group.id);
  }
}

export default RuleGroup;
