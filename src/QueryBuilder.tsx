import isEmpty from 'lodash/isEmpty';
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
}

export class QueryBuilder extends React.Component<
  IQueryBuilderProps,
  IQueryBuilderState
> {
  constructor(props: IQueryBuilderProps) {
    super(props);

    this.state = this.initializeState();
  }

  // render(): React.ReactElement {}

  private initializeState(): IQueryBuilderState {
    const classNames = this.createClassNames();
    const rules = this.createRuleElements();
    const ruleGroups = this.createRuleGroupElements();
    const query = this.createInitialQuery(ruleGroups);

    return {
      rules,
      ruleGroups,
      query,
    };
  }

  private createClassNames(): ClassNames {
    const userClassNames = this.props.classNames || {};
    const defaultClasNames = Defaults.classNames;

    return merge({}, defaultClasNames, userClassNames);
  }

  private createRuleElements(): RuleElements {
    const userRuleElements = this.props.rules || {};
    const defaultRuleElements = Defaults.ruleElements;

    defaultRuleElements.columnSelector.options = this.props.columns;

    return merge({}, defaultRuleElements, userRuleElements);
  }

  private createRuleGroupElements(): RuleGroupElements {
    const userRuleGroupElements = this.props.ruleGroups || {};
    const defaultRuleGroupElements = Defaults.ruleGroupElements;

    return merge({}, defaultRuleGroupElements, userRuleGroupElements);
  }

  private createInitialQuery(ruleGroups: RuleGroupElements): IRuleGroup {
    const query = this.props.query;
    return (
      (this.isRuleGroup(query) && query) || this.createRuleGroup(ruleGroups)
    );
  }

  private isRuleGroup(query: IRuleGroup): boolean {
    return !(isEmpty(query.combinator) && isEmpty(query.conditions));
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
