import classnames from 'classnames';
import merge from 'lodash/merge';
import React from 'react';
import Defaults from './defaults';
import defaultCombinatorSelector from './defaults/ruleGroupElements/combinatorSelector';
import {
  ClassNames,
  IRuleGroup,
  RuleElements,
  RuleGroupElements,
} from './models';
import RuleGroup from './RuleGroup';
import { isValidQuery } from './utils';

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

    this.classNames = this.createInitialClassNames();
    this.rules = this.createInitialRuleElements();
    this.ruleGroups = this.createInitialRuleGroupElements();

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
        />
      </div>
    );
  }

  private initializeState(): IQueryBuilderState {
    const query = this.createInitialQuery();

    return {
      query,
    };
  }

  private createInitialClassNames(): ClassNames {
    const userClassNames = this.props.classNames || {};
    const defaultClasNames = Defaults.classNames;

    return merge({}, defaultClasNames, userClassNames);
  }

  private createInitialRuleElements(): RuleElements {
    const userRuleElements = this.props.rules || {};
    const defaultRuleElements = Defaults.ruleElements;

    defaultRuleElements.columnSelector.options = this.props.columns;

    return merge({}, defaultRuleElements, userRuleElements);
  }

  private createInitialRuleGroupElements(): RuleGroupElements {
    const userRuleGroupElements = this.props.ruleGroups || {};
    const defaultRuleGroupElements = Defaults.ruleGroupElements;

    return merge({}, defaultRuleGroupElements, userRuleGroupElements);
  }

  private createInitialQuery(): IRuleGroup {
    const query = this.props.query;
    return (
      (isValidQuery(query) && query) || this.createRuleGroup(this.ruleGroups)
    );
  }

  private createRuleGroup(ruleGroups: RuleGroupElements): IRuleGroup {
    return {
      conditions: [],
      combinator:
        ruleGroups.combinatorSelector.defaultValue ||
        defaultCombinatorSelector.defaultValue,
    };
  }
}

export default QueryBuilder;
