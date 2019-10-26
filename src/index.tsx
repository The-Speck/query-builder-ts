import React from 'react';

export default class QueryBuilder extends React.Component {
  static get defaultProps() {
    return {
      query: null,
      columns: [],
      operators: QueryBuilder.defaultOperators,
      combinators: QueryBuilder.defaultCombinators,
      controlElements: null,
      onQueryChange: null,
      controlClassnames: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      root: {},
      schema: {},
    };
  }

  static get defaultOperators() {
    return [
      { name: 'null', label: 'Is Null' },
      { name: 'notNull', label: 'Is Not Null' },
      { name: 'in', label: 'In' },
      { name: 'notIn', label: 'Not In' },
      { name: '=', label: '=' },
      { name: '!=', label: '!=' },
      { name: '<', label: '<' },
      { name: '>', label: '>' },
      { name: '<=', label: '<=' },
      { name: '>=', label: '>=' },
    ];
  }

  static get defaultCombinators() {
    return [{ name: 'and', label: 'AND' }, { name: 'or', label: 'OR' }];
  }

  static get defaultControlClassnames() {
    return {
      queryBuilder: '',

      ruleGroup: '',
      ruleRowGroup: '',
      combinators: '',
      addRule: '',
      addGroup: '',
      removeGroup: '',

      rule: '',
      columns: '',
      operators: '',
      value: '',
      removeRule: '',
    };
  }

  createDefaultControlElements(classNames) {
    return {
      ruleGroup: {
        combinatorSelector: {
          component: ValueSelector,
          name: 'combinator',
          options: this.props.combinators,
          className: classNames.combinators,
          position: 1,
          defaultValue: this.props.combinators[0].name,
        },
        addRuleAction: {
          component: ActionElement,
          name: 'addRule',
          label: '+Rule',
          className: classNames.addRule,
          position: 97,
        },
        addGroupAction: {
          component: ActionElement,
          name: 'addGroup',
          label: '+Group',
          className: classNames.addGroup,
          position: 98,
        },
        removeGroupAction: {
          component: ActionElement,
          name: 'removeGroup',
          label: 'X',
          className: classNames.removeGroup,
          position: 99,
          condition: ({ parentId }) => parentId,
        },
      },
      rule: {
        columnSelector: {
          component: ValueComboBox,
          name: 'column',
          options: this.props.columns,
          className: classNames.columns,
          position: 1,
          defaultValue: '',
        },
        operatorSelector: {
          component: ValueSelector,
          name: 'op',
          options: this.props.operators,
          className: classNames.operators,
          position: 2,
          defaultValue: '=',
        },
        valueEditor: {
          component: ValueEditor,
          name: 'value',
          className: classNames.value,
          label: 'Value',
          position: 3,
          defaultValue: '',
          condition: ({ rule }) => rule.op !== 'null' && rule.op !== 'notNull',
        },
        removeRuleAction: {
          component: ActionElement,
          name: 'removeRule',
          label: 'x',
          className: classNames.removeRule,
          position: 99,
        },
      },
    };
  }

  protected componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.query) !== JSON.stringify(prevProps.query)) {
      this.setState({ root: this.generateValidQuery(this.props.query) });
    }

    if (this.props.columns !== prevProps.columns) {
      this.initialize();
    }
  }

  protected componentWillMount() {
    this.initialize();
  }
}
