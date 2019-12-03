import classnames from 'classnames';
import merge from 'lodash/merge';
import * as React from 'react';
import { ConditionNotFound } from './error';
import {
  Condition,
  QueryBuilderClassNames,
  RuleElements,
  RuleGroupCondition,
  RuleGroupElements,
} from './models';
import RuleGroup from './RuleGroup';
import {
  createInitialClassNames,
  createInitialQuery,
  createInitialRuleElements,
  createInitialRuleGroupElements,
  findCondition,
  findConditionIdxAndParentGroup,
  isNumber,
  isRuleGroup,
  typeCheck,
} from './utils';

export interface QueryBuilderProps {
  columns?: any[];
  rules?: RuleElements;
  ruleGroups?: RuleGroupElements;
  query?: RuleGroupCondition;
  classNames?: QueryBuilderClassNames;
  onQueryChange?: (query: RuleGroupCondition) => void;
}

export interface QueryBuilderState {
  query: RuleGroupCondition;
}

export class QueryBuilder extends React.Component<
  QueryBuilderProps,
  QueryBuilderState
> {
  private classNames: QueryBuilderClassNames;
  private rules: RuleElements;
  private ruleGroups: RuleGroupElements;

  constructor(props: QueryBuilderProps) {
    super(props);

    const { columns, classNames, rules, ruleGroups } = props;

    this.classNames = createInitialClassNames(classNames);
    this.rules = createInitialRuleElements(columns, rules);
    this.ruleGroups = createInitialRuleGroupElements(ruleGroups);

    this.state = this.initializeState();

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onPropChange = this.onPropChange.bind(this);
  }

  render(): React.ReactElement {
    return (
      <div
        className={classnames(
          typeCheck(this.classNames.queryBuilder, this.props),
        )}>
        <RuleGroup
          query={this.state.query}
          group={this.state.query}
          level={0}
          rules={this.rules}
          ruleGroups={this.ruleGroups}
          classNames={this.classNames}
          onAdd={this.onAdd}
          onRemove={this.onRemove}
          onPropChange={this.onPropChange}
        />
      </div>
    );
  }

  public onAdd(condition: Condition, parentId: string): void {
    const query = merge({}, this.state.query);
    const parentGroup = findCondition(parentId, query);

    if (parentGroup && isRuleGroup(parentGroup)) {
      parentGroup.conditions.push(condition);
      this.updateQuery(query);
    } else {
      throw new ConditionNotFound('group', parentId);
    }
  }

  public onRemove(conditionId: string): void {
    const query = merge({}, this.state.query);
    const [idx, group] = findConditionIdxAndParentGroup(conditionId, query);

    if (isNumber(idx) && group && isRuleGroup(group)) {
      group.conditions.splice(idx, 1);
      this.updateQuery(query);
    } else {
      throw new ConditionNotFound('group', conditionId);
    }
  }

  public onPropChange(key: string, value: any, conditionId: string): void {
    const query = merge({}, this.state.query);
    const condition = findCondition(conditionId, query);

    if (condition) {
      Object.assign(condition, { [key]: value });
      this.updateQuery(query);
    } else {
      throw new ConditionNotFound('condition', conditionId);
    }
  }

  private updateQuery(query: RuleGroupCondition): void {
    const { onQueryChange } = this.props;
    this.setState(
      { query },
      () => onQueryChange && onQueryChange(this.state.query),
    );
  }

  private initializeState(): QueryBuilderState {
    const query = createInitialQuery(this.ruleGroups, this.props.query);

    return {
      query,
    };
  }
}

export default QueryBuilder;
