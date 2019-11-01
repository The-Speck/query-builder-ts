import classnames from 'classnames';
import React from 'react';
import {
  ClassNames,
  Condition,
  ControlElement,
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
  query: IRuleGroup;
  rules: RuleElements;
  ruleGroups: RuleGroupElements;
  classNames: ClassNames;
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
        {conditions.map((condition: Condition, idx: number) => {
          return isRuleGroup(condition) ? (
            <RuleGroup
              key={idx}
              group={condition}
              level={this.props.level + 1}
              {...this.props}
            />
          ) : (
            <Rule key={idx} rule={condition} />
          );
        })}
      </div>
    );
  }

  private createComponents(): React.ReactNode {
    const elements = createSortedElements(this.props.ruleGroups);

    return elements.map((element: ControlElement, idx: number) =>
      React.createElement(element.component, {
        key: idx,
        ...this.props,
      }),
    );
  }

  private sortConditions(conditions: Condition[]): Condition[] {
    return conditions.sort((a: Condition, b: Condition) =>
      isRuleGroup(a) === isRuleGroup(b) ? 0 : isRuleGroup(a) ? 1 : -1,
    );
  }
}

export default RuleGroup;
