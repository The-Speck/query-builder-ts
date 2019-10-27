import classnames from 'classnames';
import React from 'react';
import { Condition, IRuleGroup } from './models';
import { IQueryBuilderState } from './QueryBuilder';
import { isRuleGroup } from './utils';

export interface IRuleGroupProps extends IQueryBuilderState {
  group: IRuleGroup;
  level: number;
}

export class RuleGroup extends React.Component<IRuleGroupProps, null> {
  render(): React.ReactNode {
    const { group, classNames, level } = this.props;
    const conditions = this.sortGroup(group.conditions);

    return (
      <div className={classnames(level > 0 ? classNames.ruleGroup : null)}>
        <div className={classnames(classNames.ruleGroupRow)}>
          {this.renderComponents()}
        </div>
        {conditions.map((condition: Condition, idx: number) => {
          return isRuleGroup(condition) ? (
            <RuleGroup
              key={idx}
              group={condition}
              level={this.props.level + 1}
            />
          ) : (
            <Rule key={idx} rule={condition} />
          );
        })}
      </div>
    );
  }

  private createComponents(): React.ReactElement {}

  private sortGroup(conditions: Condition[]): Condition[] {
    return conditions.sort((a: Condition, b: Condition) =>
      isRuleGroup(a) === isRuleGroup(b) ? 0 : isRuleGroup(a) ? 1 : -1,
    );
  }
}
