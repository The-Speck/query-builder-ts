import { boundMethod } from 'autobind-decorator';
import classnames from 'classnames';
import merge from 'lodash/merge';
import React from 'react';
import { ConditionNotFound } from './error';
import {
  ClassNames,
  IRuleGroup,
  RuleElements,
  RuleGroupElements,
  TCondition,
} from './models';
import RuleGroup from './RuleGroup';
import {
  createInitialClassNames,
  createInitialQuery,
  createInitialRuleElements,
  createInitialRuleGroupElements,
  findCondition,
  isRuleGroup,
} from './utils';

export interface IQueryBuilderProps {
  rules?: RuleElements;
  ruleGroups?: RuleGroupElements;
  columns: any[];
  query: IRuleGroup;
  classNames: ClassNames;
}

export interface IQueryBuilderState {
  query: IRuleGroup;
}

export class QueryBuilder extends React.Component<
  IQueryBuilderProps,
  IQueryBuilderState
> {
  private classNames: ClassNames;
  private rules: RuleElements;
  private ruleGroups: RuleGroupElements;

  constructor(props: IQueryBuilderProps) {
    super(props);

    const { columns, classNames, rules, ruleGroups } = props;

    this.classNames = createInitialClassNames(classNames);
    this.rules = createInitialRuleElements(columns, rules);
    this.ruleGroups = createInitialRuleGroupElements(ruleGroups);

    this.state = this.initializeState();
  }

  render(): React.ReactNode {
    return (
      <div className={classnames(this.classNames.queryBuilder)}>
        <RuleGroup
          query={this.state.query}
          group={this.state.query}
          level={0}
          rules={this.rules}
          ruleGroups={this.ruleGroups}
          classNames={this.classNames}
          onAdd={this.onAdd}
        />
      </div>
    );
  }

  @boundMethod
  public onAdd(condition: TCondition, groupId: string): void {
    const query = merge({}, this.state.query);
    const group = findCondition(groupId, query);

    if (group && isRuleGroup(group)) {
      group.conditions.push(condition);
      this.setState({ query });
    } else {
      throw new ConditionNotFound('group', groupId);
    }
  }

  @boundMethod
  public onRemove(conditionId: string, groupId: string): void {
    const query = merge({}, this.state.query);
    const group = findCondition(groupId, query);

    if (group && isRuleGroup(group)) {
      const index = group.conditions.findIndex(
        (g: TCondition) => g.id === conditionId,
      );
      group.conditions.splice(index, 1);
      this.setState({ query });
    } else {
      throw new ConditionNotFound('group', groupId);
    }
  }

  @boundMethod
  public onPropChange(key: string, value: any, ruleId: string): void {
    const query = merge({}, this.state.query);
    const rule = findCondition(ruleId, query);

    if (rule && !isRuleGroup(rule)) {
      Object.assign(rule, { [key]: value });
      this.setState({ query });
    } else {
      throw new ConditionNotFound('rule', ruleId);
    }
  }

  private initializeState(): IQueryBuilderState {
    const query = createInitialQuery(this.props.query, this.ruleGroups);

    return {
      query,
    };
  }
}

export default QueryBuilder;
