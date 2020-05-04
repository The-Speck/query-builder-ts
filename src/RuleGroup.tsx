import classnames from 'classnames';
import * as React from 'react';
import {
  Condition,
  ControlActions,
  ControlElementProps,
  ControlProps,
  OnAdd,
  OnChange,
  OnElementChange,
  OnPropChange,
  OnRemove,
  QueryBuilderClassNames,
  RuleCondition,
  RuleElement,
  RuleGroupCondition,
  RuleGroupElement,
} from './models';
import { QueryBuilderState } from './QueryBuilder';
import Rule from './Rule';
import {
  createRule,
  createRuleGroup,
  isRuleGroup,
  isValidName,
  typeCheck,
} from './utils';

export interface RuleGroupProps extends QueryBuilderState {
  columns?: any[];
  group: RuleGroupCondition;
  level: number;
  rules: RuleElement[];
  ruleGroups: RuleGroupElement[];
  classNames: QueryBuilderClassNames;
  onAdd: OnAdd;
  onRemove: OnRemove;
  onPropChange: OnPropChange;
}

export interface RuleGroupElementAttributes
  extends React.Attributes,
    ControlProps {}

export class RuleGroup extends React.Component<RuleGroupProps> {
  constructor(props: RuleGroupProps) {
    super(props);

    this.addRule = this.addRule.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
    this.onElementChange = this.onElementChange.bind(this);
  }

  render(): React.ReactNode {
    const { group, classNames } = this.props;
    const conditions = this.sortConditions(group.conditions);

    return (
      <div className={classnames(typeCheck(classNames.ruleGroup, this.props))}>
        <div
          className={classnames(
            typeCheck(classNames.ruleGroupRow, this.props),
          )}>
          {this.createComponents()}
        </div>
        {this.createChildren(conditions)}
      </div>
    );
  }

  private createComponents(): React.ReactNode {
    return this.props.ruleGroups.map(
      (element: RuleGroupElement, idx: number): React.ReactNode =>
        React.createElement(element.component, {
          ...element.props,
          element,
          key: idx,
          onChange: this.assignOnChangeWrapper(element),
          parentProps: { ...this.props },
          value: this.props.group[element.name],
        } as RuleGroupElementAttributes),
    );
  }

  private createChildren(conditions: Condition[]): React.ReactNode {
    return conditions.map(
      (condition: Condition, idx: number): React.ReactNode => {
        return isRuleGroup(condition) ? (
          <RuleGroup
            {...this.props}
            key={idx}
            group={condition as RuleGroupCondition}
            level={this.props.level + 1}
          />
        ) : (
          <Rule key={idx} rule={condition as RuleCondition} {...this.props} />
        );
      },
    );
  }

  // Using '===' because nothing should change if both are true or false.
  private sortConditions(conditions: Condition[]): Condition[] {
    return conditions.sort((a: Condition, b: Condition): number =>
      isRuleGroup(a) === isRuleGroup(b) ? 0 : isRuleGroup(a) ? 1 : -1,
    );
  }

  private assignOnChangeWrapper({
    name,
    props,
  }: RuleGroupElement): OnChange | undefined {
    switch (name) {
      case ControlActions.ADD_GROUP:
        return this.addGroup;
      case ControlActions.ADD_RULE:
        return this.addRule;
      case ControlActions.REMOVE_GROUP:
        return this.removeGroup;
      default:
        if (isValidName(name)) {
          return this.onElementChange(name, props);
        }
        return undefined;
    }
  }

  private addRule(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    const { rules, group, onAdd } = this.props;
    const newRule = createRule(rules);
    onAdd(newRule, group.id);
  }

  private addGroup(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    const { ruleGroups, group, onAdd } = this.props;
    const newGroup = createRuleGroup(ruleGroups);
    onAdd(newGroup, group.id);
  }

  private removeGroup(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    event.stopPropagation();

    const { group, onRemove } = this.props;
    onRemove(group.id);
  }

  private onElementChange(
    property: string,
    props?: ControlElementProps,
  ): OnElementChange {
    const { group, onPropChange } = this.props;
    const onChange = props && props.onChange;

    return (value: any): void => {
      onChange && onChange(value);
      onPropChange(property, value, group.id);
    };
  }
}

export default RuleGroup;
