import { boundMethod } from 'autobind-decorator';
import classnames from 'classnames';
import React, { Attributes } from 'react';
import defaultCombinatorSelector from './defaults/ruleGroupElements/combinatorSelector';
import {
  ClassNames,
  ControlElement,
  IRule,
  IRuleGroup,
  onAdd,
  RuleElements,
  RuleGroupElements,
  TCondition,
  THandleOnChange,
} from './models';
import { IQueryBuilderState } from './QueryBuilder';
import Rule from './Rule';
import { createSortedElements, isRuleGroup, quickUUID } from './utils';

export interface IRuleGroupProps extends IQueryBuilderState {
  group: IRuleGroup;
  level: number;
  rules: RuleElements;
  ruleGroups: RuleGroupElements;
  classNames: ClassNames;
  onAdd: onAdd;
}

export interface IRuleGroupElementAttributes extends Attributes {
  handleOnChange: THandleOnChange;
  parentProps: IRuleGroupProps;
  value: any;
}

export class RuleGroup extends React.Component<IRuleGroupProps> {
  public static createRuleGroup(ruleGroups: RuleGroupElements): IRuleGroup {
    // Add the other potential custom rule group elements
    return {
      id: quickUUID(),
      conditions: [],
      combinator:
        ruleGroups.combinatorSelector.defaultValue ||
        defaultCombinatorSelector.defaultValue,
    };
  }

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

  private setOnChange(element: ControlElement): THandleOnChange {
    switch (element.name) {
      case this.props.ruleGroups.addGroupAction.name:
        return this.addGroup;
      case this.props.ruleGroups.addRuleAction.name:
        return this.addRule;
      case this.props.ruleGroups.removeGroupAction.name:
        return this.removeGroup;
      default:
        return this.onElementChanged;
    }
  }

  @boundMethod
  private addRule(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    console.log('addRule');
  }

  @boundMethod
  private addGroup(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();
  }

  @boundMethod
  private removeGroup(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    console.log('removeGroup');
  }

  @boundMethod
  private onElementChanged(property: string): void {
    console.log('onElementChanged', property);
  }
}

export default RuleGroup;
