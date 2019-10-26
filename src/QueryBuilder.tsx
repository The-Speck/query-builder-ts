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
import { RuleGroup } from './RuleGroup';
import { isRuleGroup } from './utils';

export interface IQueryBuilderProps {
  rules?: RuleElements;
  ruleGroups?: RuleGroupElements;
  columns: any[];
  query: IRuleGroup;
  classNames: ClassNames;
}

export interface IQueryBuilderState {
  rules: RuleElements;
  ruleGroups: RuleGroupElements;
  query: IRuleGroup;
  classNames: ClassNames;
}

export class QueryBuilder extends React.Component<
  IQueryBuilderProps,
  IQueryBuilderState
> {
  constructor(props: IQueryBuilderProps) {
    super(props);

    this.state = this.initializeState();
  }

  render(): React.ReactElement {
    return (
      <div className={classnames(this.state.classNames.queryBuilder)}>
        <RuleGroup group={this.state.query} level={0} {...this.state} />;
      </div>
    );
  }

  private initializeState(): IQueryBuilderState {
    const classNames = this.createInitialClassNames();
    const rules = this.createInitialRuleElements();
    const ruleGroups = this.createInitialRuleGroupElements();
    const query = this.createInitialQuery(ruleGroups);

    return {
      rules,
      ruleGroups,
      query,
      classNames,
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

  private createInitialQuery(ruleGroups: RuleGroupElements): IRuleGroup {
    const query = this.props.query;
    return (isRuleGroup(query) && query) || this.createRuleGroup(ruleGroups);
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
