import { boundMethod } from 'autobind-decorator';
import classnames from 'classnames';
import React, { Attributes } from 'react';
import {
  ClassNames,
  Condition,
  ControlElement,
  handleOnChange,
  IRule,
  IRuleGroup,
  RuleElements,
  RuleGroupElements,
} from './models';
import { IQueryBuilderState } from './QueryBuilder';
import Rule from './Rule';
import { createSortedElements, isRuleGroup } from './utils';

export interface IRuleGroupProps extends IQueryBuilderState {
  group: IRuleGroup;
  level: number;
  rules: RuleElements;
  ruleGroups: RuleGroupElements;
  classNames: ClassNames;
}

export interface IRuleGroupElementAttributes extends Attributes {
  handleOnChange: handleOnChange;
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

  private createChildren(conditions: Condition[]): React.ReactNode {
    return conditions.map((condition: Condition, idx: number) => {
      return isRuleGroup(condition) ? (
        <RuleGroup
          key={idx}
          group={condition as IRuleGroup}
          level={this.props.level + 1}
          {...this.props}
        />
      ) : (
        <Rule key={idx} rule={condition as IRule} {...this.props} />
      );
    });
  }

  private sortConditions(conditions: Condition[]): Condition[] {
    return conditions.sort((a: Condition, b: Condition) =>
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

  private setOnChange(element: ControlElement): handleOnChange {
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
  private addRule(): void {}

  @boundMethod
  private addGroup(): void {}

  @boundMethod
  private removeGroup(): void {}

  @boundMethod
  private onElementChanged(): void {}
}

export default RuleGroup;
