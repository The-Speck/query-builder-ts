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
      <div className={classnames(level ? classNames.ruleGroup : null)}>
        <div className={classnames(classNames.ruleGroupRow)}>
          {this.renderComponents(level, group)}
        </div>
        {conditions.map(condition => {
          return isRuleGroup(condition) ? (
            <RuleGroup group={condition} level={this.props.level + 1} />
          ) : (
            <Rule
              key={r.id}
              id={r.id}
              rule={r}
              schema={this.props.schema}
              parentId={this.props.id}
              onRuleRemove={onRuleRemove}
            />
          );
        })}
      </div>
    );
  }

  sortGroup(conditions: Condition[]): Condition[] {
    return conditions.sort((a: Condition, b: Condition) =>
      isRuleGroup(a) === isRuleGroup(b) ? 0 : isRuleGroup(a) ? 1 : -1,
    );
  }
}
