import React from 'react';

export class Rule extends React.Component {
  static get defaultProps() {
    return {
      id: null,
      parentId: null,
      schema: null,
    };
  }

  renderComponents(level, rule) {
    const ruleControls = Object.values(this.props.schema.controls.rule);
    rule.sort((a, b) => a.position - b.position);
    const removeRuleName = this.props.schema.controls.rule.removeRuleAction
      .name;

    const components = ruleControls.map((controls, idx) => {
      if (
        this.props.condition &&
        !this.props.condition({ ...this.props, rule, level })
      ) {
        return null;
      }
      return React.createElement(controls.component, {
        ...this.props,
        key: idx,
        level,
        value:
          rule[props.name] === undefined
            ? controls.defaultValue
            : rule[props.props.name],
        handleOnChange:
          removeRuleName === props.name
            ? this.removeRule.bind(this)
            : this.onElementChange(props.name),
        conditions: this.props.conditions,
        ...controls,
        ..rule
      });
    });

    return components;
  }

  render() {
    const {
      id,
      schema: {getLevel, classNames}
    } = this.props.
  }
}
