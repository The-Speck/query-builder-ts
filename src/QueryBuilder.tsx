import classnames from 'classnames';
import merge from 'lodash/merge';
import * as React from 'react';
import Defaults from './defaults';
import { ConditionNotFound } from './error';
import {
  Condition,
  QueryBuilderClassNames,
  RuleElement,
  RuleGroupCondition,
  RuleGroupElement,
} from './models';
import RuleGroup from './RuleGroup';
import {
  createClassNames,
  createQuery,
  findCondition,
  findConditionIdxAndParentGroup,
  isNumber,
  isRuleGroup,
  typeCheck,
} from './utils';

export interface QueryBuilderProps {
  columns?: any[];
  rules?: RuleElement[];
  ruleGroups?: RuleGroupElement[];
  query?: RuleGroupCondition;
  classNames?: QueryBuilderClassNames;
  onQueryChange?: (query: RuleGroupCondition) => void;
}

export interface QueryBuilderState {
  query: RuleGroupCondition;
  classNames: QueryBuilderClassNames;
}

export class QueryBuilder extends React.Component<
  QueryBuilderProps,
  QueryBuilderState
> {
  constructor(props: QueryBuilderProps) {
    super(props);

    this.state = this.initializeState();

    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onPropChange = this.onPropChange.bind(this);
  }

  componentDidUpdate(prevProps: Readonly<QueryBuilderProps>): void {
    if (prevProps !== this.props) {
      let query = this.state.query;
      let classNames = this.state.classNames;

      if (!this.props.query) {
        query = createQuery(this.getRuleGroups(), this.state.query);
      } else if (this.props.query !== prevProps.query) {
        query = createQuery(this.getRuleGroups(), this.props.query);
      }
      if (this.props.classNames !== prevProps.classNames) {
        classNames = createClassNames(this.props.classNames);
      }

      this.setState({ query, classNames });
    }
  }

  render(): React.ReactElement {
    const { query, classNames } = this.state;

    return (
      <div
        className={classnames(typeCheck(classNames.queryBuilder, this.props))}>
        <RuleGroup
          query={query}
          group={query}
          level={0}
          rules={this.getRules()}
          ruleGroups={this.getRuleGroups()}
          columns={this.props.columns}
          classNames={classNames}
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

  private getRules(): RuleElement[] {
    return this.props.rules || Object.values(Defaults.RULE);
  }

  private getRuleGroups(): RuleGroupElement[] {
    return this.props.ruleGroups || Object.values(Defaults.RULE_GROUP);
  }

  private updateQuery(query: RuleGroupCondition): void {
    const { onQueryChange } = this.props;
    this.setState(
      { query },
      () => onQueryChange && onQueryChange(this.state.query),
    );
  }

  private initializeState(): QueryBuilderState {
    const query = createQuery(this.getRuleGroups(), this.props.query);
    const classNames = createClassNames(this.props.classNames);

    return {
      query,
      classNames,
    };
  }
}

export default QueryBuilder;
