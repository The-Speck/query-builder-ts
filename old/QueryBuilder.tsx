import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import React from 'react';
import uniqueId from 'uuid';
import RuleGroup from './RuleGroup';

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

  initialize() {
    const { controlElements, controlClassnames } = this.props;
    const classNames = {
      ...QueryBuilder.defaultControlClassnames,
      ...controlClassnames,
    };
    const controls = this._createControls(controlElements, classNames);

    this.setState({
      root: this.getInitialQuery(controls),
      schema: {
        classNames,
        controls,
        columns: this.props.columns,
        createRule: this.createRule.bind(this),
        createRuleGroup: this.createRuleGroup.bind(this),
        onRuleAdd: this._notifyQueryChange.bind(this, this.onRuleAdd),
        onGroupAdd: this._notifyQueryChange.bind(this, this.onGroupAdd),
        onRuleRemove: this._notifyQueryChange.bind(this, this.onRuleRemove),
        onGroupRemove: this._notifyQueryChange.bind(this, this.onGroupRemove),
        onPropChange: this._notifyQueryChange.bind(this, this.onPropChange),
        getLevel: this._notifyQueryChange.bind(this, this.getLevel),
        isRuleGroup: this._notifyQueryChange.bind(this, this.isRuleGroup),
      },
    });
  }

  generateValidQuery(query) {
    if (this.isRuleGroup(query)) {
      return {
        id: query.id || `g-${uniqueId()}`,
        conditions: query.conditions.map(rule => this.generateValidQuery(rule)),
        combinator: query.combinator,
      };
    }
  }

  generateInitialQuery(controls) {
    const { query } = this.props;
    return (
      (query && this.generateValidQuery(query)) ||
      this.createRuleGroup(controls.ruleGroup)
    );
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

  protected componentDidMount() {
    this._notifyQueryChange(null);
    this.initialize();
  }

  protected render() {
    const { root, schema } = this.state;
    return (
      <div className={`${schema.classNames.queryBuilder}`}>
        <RuleGroup
          group={root}
          id={root.id}
          conditions={root.conditions}
          schema={schema}
          parentId={null}
        />
      </div>
    );
  }

  private isRuleGroup(rule) {
    return rule.combindator && rule.conditions;
  }

  private createRule() {
    const rule = { id: `r-${uniqueId()}` };
    const ruleControls = this.state.schema.controls.rule;

    Object.values(ruleControls).forEach(({ name, defaultValue }) => {
      if (defaultValue !== undefined) {
        rule[name] = defaultValue;
      }
    });

    return rule;
  }

  private createRuleGroup(ruleGroupInitial) {
    const ruleGroup = { id: `g-${uniqueId()}` };
    const ruleGroupControls =
      ruleGroupInitial || this.state.schema.controls.ruleGroup;

    Object.values(ruleGroupControls).forEach(({ name, defaultValue }) => {
      if (defaultValue !== undefined) {
        ruleGroup[name] = defaultValue;
      }
    });

    return ruleGroup;
  }

  private onRuleAdd(rule, parentId) {
    const parent = this._findRule(parentId, this.state.root);
    parent.conditions.push(rule);

    this.setState({ root: this.state.root });
  }

  private onGroupAdd(group, parentId) {
    const parent = this._findRule(parentId, this.state.root);
    parent.conditions.push(group);

    this.setState({ root: this.state.root });
  }

  private onPropChange(prop, value, ruleId) {
    const rule = this._findRule(ruleId, this.state.root);
    Object.assign(rule, { [prop]: value });

    this.setState({ root: this.state.root });
  }

  private onRuleRemove(ruleId, parentId) {
    const parent = this._findRule(parentId, this.state.root);
    const index = parent.conditions.findIndex(x => x.id === ruleId);

    parent.conditions.splice(index, 1);
    this.setState({ root: this.state.root });
  }

  private onGroupRemove(groupId, parentId) {
    const parent = this._findRule(parentId, this.state.root);
    const index = parent.conditions.findIndex(x => x.id === groupId);

    parent.conditions.splice(index, 1);
    this.setState({ root: this.state.root });
  }

  private getLevel(id) {
    return this._getLevel(id, 0, this.state.root);
  }

  private _getLevel(id, index, root) {
    const { isRuleGroup } = this.state.schema;

    let foundAtIndex = -1;
    if (root.id === id) {
      foundAtIndex = index;
    } else if (isRuleGroup(root)) {
      root.conditions.forEach(rule => {
        if (foundAtIndex === -1) {
          let indexForRule = index;
          if (isRuleGroup(rule)) {
            indexForRule++;
          }
          foundAtIndex = this._getLevel(id, indexForRule, rule);
        }
      });
    }

    return foundAtIndex;
  }

  private _findRule(id, parent) {
    const { isRuleGroup } = this.state.schema;

    if (parent.id === id) {
      return parent;
    }

    for (const rule of parent.conditions) {
      if (rule.id === id) {
        return rule;
      } else if (isRuleGroup(rule)) {
        const subRule = this._findRule(id, rule);
        if (subRule) {
          return subRule;
        }
      }
    }
  }

  private _notifyQueryChange(fn, ...args) {
    if (fn) {
      fn.call(this, ...args);
    }

    const { onQueryChange } = this.props;
    if (onQueryChange) {
      const query = cloneDeep(this.state.root);
      onQueryChange(query);
    }
  }

  private _createControls(controlElements, classNames) {
    const defaultControlElements = this.createDefaultControlElements(
      classNames,
    );
    if (controlElements) {
      this._sortByPosition(defaultControlElements, controlElements);
      return merge({}, defaultControlElements, controlElements);
    }
    return defaultControlElements;
  }

  private _sortByPosition(defaultControls, incomingControls) {
    if (incomingControls.ruleGroup) {
      this._sort(defaultControls.ruleGroup, incomingControls.ruleGroup);
    }
    if (incomingControls.rule) {
      this._sort(defaultControls.rule, incomingControls.rule);
    }
  }

  private _sort(defaultControls, incomingControls) {
    const positions = new Set(
      Object.values(incomingControls).map(c => c.position),
    );
    for (const control in defaultControls) {
      if (positions.has(defaultControls[control].position)) {
        defaultControls[control].position++;
        positions.add(defaultControls[control].position);
      }
    }
  }
}
