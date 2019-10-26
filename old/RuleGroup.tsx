import React from 'react';

export class RuleGroup extends React.Component {
  static get defaultProps() {
    return {
      id: null,
      parentId: null,
      conditions: [],
      schema: {},
    };
  }

  actionHandler(name) {
    switch (name) {
      case this.props.schema.controls.RuleGroup.addRuleAction.name:
        return this.addRule;
      case this.props.schema.controls.RuleGroup.addGroupAction.name:
        return this.addGroup;
      case this.props.schema.controls.ruleGroup.removeGroupAction.name:
        return this.removeGroup;
      default:
        return this.onElementChanged(name);
    }
  }

  renderComponents(level, group) {
    const ruleGroupControls = Object.values(
      this.props.schema.controls.ruleGroup,
    );
    ruleGroupControls.sort((a, b) => a.position - b.position);

    const components = ruleGroupControls
      .filter(
        ({ name }) =>
          name !==
            this.props.schema.controls.ruleGroup.removeGroupAction.name ||
          this.hasParentGroup,
      )
      .map((controls, idx) => {
        return React.createElement(controls.component, {
          ...this.props,
          key: idx,
          level,
          value: group[name] || controls.defaultValue,
          handleOnChange: this.actionHandler(name).bind(this),
          conditions: this.props.conditions,
          ...controls,
        });
      });

    return components;
  }

  render() {
    const {
      group,
      conditions,
      id,
      schema: { onRuleRemove, isRuleGroup, getLevel, classNames },
    } = this.props;
    const level = getLevel(id);
    return (
      <div
        className={`${
          this.hasParentGroup() ? 'border-left pt-2 container-fluid' : ''
        } ${classNames.ruleGroup}`}>
        <div className={classNames.ruleRowGroup}>
          {this.renderComponents(level, group)}
        </div>
        {this.sortGroup(conditions, isRuleGroup).map(r => {
          return isRuleGroup(r) ? (
            <RuleGroup
              key={r.id}
              id={r.id}
              group={r}
              schema={this.props.schema}
              parentId={this.propss.id}
              conditions={r.condition}
            />
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

  hasParentGroup() {
    return this.props.parentId;
  }

  onElementChanged(property) {
    const {
      id,
      schema: { onPropChange },
    } = this.props;

    return value => onPropChange(property, value, id);
  }

  addRule(event) {
    event.preventDefault();
    event.stopPropagation();

    const { createRule, onRuleAdd } = this.props.schema;
    const newRule = createRule();
    onRuleAdd(newRule, this.props.id);
  }

  addGroup(event) {
    event.preventDefault();
    event.stopPropagation();

    const { createRuleGroup, onGroupAdd } = this.props.schema;
    const newRule = createRuleGroup();
    onGroupAdd(newRule, this.props.id);
  }

  removeGroup(event) {
    event.preventDefault();
    event.stopPropagation();

    this.props.schema.onGroupRemove(this.props.children, this.props.parentId);
  }

  sortGroup(conditions, isRuleGroup) {
    return conditions.sort((a, b) =>
      isRuleGroup(a) === isRuleGroup(b) ? 0 : isRuleGroup(a) ? 1 : -1,
    );
  }
}

export default RuleGroup;
