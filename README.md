# React Query Builder TS

## Credits

This Typescript Query builder component is heavily inspired by sapientglobalmarkets' Query Builder:

- [React Querybuilder](https://github.com/sapientglobalmarkets/react-querybuilder)

## Getting Started

![Overview](./assets/query-builder-overview.png)

```shell
npm install react-querybuilder-ts --save
```

## Demo

To run a demo of the react-querybuilder being used, clone the project and run yarn install in both the root and example folders.

- In the root directory `yarn install` and `yarn start`
- wait until the root directory finishes compiling
- In the example directory `yarn install`and `yarn start`
- Open brower and go to `http://localhost:1234/`

OR

[See live demo](https://The-Speck.github.io/react-querybuilder-ts/)

# Usage

## Minimal Default Example

```jsx
import QueryBuilder from 'react-querybuilder-ts';

const columns = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
];

const handleOnQueryChange = query => {
  console.log(query);
};

return <QueryBuilder columns={columns} onQueryChange={handleOnQueryChange} />;
```

#### Default Rule Elements

The columns passed as props to the `QueryBuilder` component are assigned the `columnSelector` but it is not required if you want to customize the elements. The `name` attribute for the elements is required and corresponds to the key name in the query condition. The `component` corresponds to the component that will render. These are available as imports.

```tsx
{
  columnSelector: {
    component: ValueComboBox,
    name: 'column',
    className: ruleElementsClassNames.columns,
    position: 1,
    defaultValue: '',
  },
  operatorSelector: {
    component: ValueDropDown,
    name: 'op',
    options: [
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
    ],
    className: ruleElementsClassNames.operators,
    position: 2,
    defaultValue: '=',
  },
  valueInput: {
    component: ValueInput,
    name: 'value',
    className: ruleElementsClassNames.value,
    label: 'Value',
    position: 3,
    defaultValue: '',
    condition: ({ parentProps }: ControlProps): boolean =>
      (parentProps as RuleProps).rule.op !== 'null' &&
      (parentProps as RuleProps).rule.op !== 'notNull'
  },
  removeRuleAction: {
    component: ActionButton,
    name: 'removeRule',
    label: 'x',
    className: ruleElementsClassNames.removeRule,
    position: 99,
  },
}
```

#### Default Rule Group Elements

```tsx
{
  combinatorSelector: {
    component: ValueDropDown,
    name: 'combinator',
    options: defaultCombinators,
    className: ruleGroupElementsClassNames.combinators,
    position: 1,
    defaultValue: defaultCombinators[0].name, // '='
  },
  addRuleAction: {
    component: ActionButton,
    name: 'addRule',
    label: '+Rule',
    className: ruleGroupElementsClassNames.addRule,
    position: 97,
  },
  addGroupAction: {
    component: ActionButton,
    name: 'addGroup',
    label: '+Group',
    className: ruleGroupElementsClassNames.addGroup,
    position: 98,
  },
  removeGroupAction: {
    component: ActionButton,
    name: 'removeGroup',
    label: 'X',
    className: ruleGroupElementsClassNames.removeGroup,
    position: 99,
    condition: ({ parentProps }: ControlProps): boolean =>
      (parentProps as RuleGroupProps).level > 0
  },
}
```

---

## Advanced Customization Example

#### Build your own component

```tsx
  {
    component: React.FunctionComponent<any> | React.ComponentClass<any>;
    name: Name;
    className?: ControlElementClassNames;
    options?: any[];
    label?: string;
    position?: number;
    condition?: ConditionFunction;
    defaultValue?: string;
    mapInput?: (value: any, props: ControlProps) => any;
    mapOutput?: (value: any, props: ControlProps) => any;
    debounceTime?: number; // For ValueComboBox and ValueInput
    inputType?: string; // For ValueComboBox and ValueInput
  }
```

User created elements will deep merge with the default elements.

```jsx
import QueryBuilder from 'react-querybuilder-ts';

const columns = [
  { databaseName: 'firstName', displayName: 'First Name', type: 'string' },
  { databaseName: 'lastName', displayName: 'Last Name', type: 'string' },
  { databaseName: 'address', displayName: 'Address', type: 'string' },
  { databaseName: 'age', displayName: 'Age', type: 'number' },
];

const handleOnQueryChange = query => {
  console.log(query);
};

return (
  <QueryBuilder
    onQueryChange={handleOnQueryChange}
    rules={
      {
        columnSelector: {
          component: ValueComboBox,
          name: 'column',
          className: {
            input: '',
            container: 'filteredOptionsContainer',
            ul: 'filteredOptionsList',
            li: 'filteredOptionsItem',
          },
          options: columns
          position: 1,
          defaultValue: '',
          mapInput:
        },
        valueInput: {
          component: ValueInput,
          name: 'value',
          className: ruleElementsClassNames.value,
          label: 'Value',
          position: 3,
          defaultValue: '',
          condition: ({ parentProps }: ControlProps): boolean =>
            (parentProps as RuleProps).rule.op !== 'null' &&
            (parentProps as RuleProps).rule.op !== 'notNull' &&
            (parentProps as RuleProps).rule.type !== 'column'
        },
        valueSelector: {
          component: ValueComboBox,
          name: 'value',
          className: {
            input: '',
            container: 'filteredOptionsContainer',
            ul: 'filteredOptionsList',
            li: 'filteredOptionsItem',
          },
          position: 3,
          defaultValue: '',
          options: columns,
          condition: condition: ({ parentProps }: ControlProps): boolean =>
            (parentProps as RuleProps).rule.op !== 'null' &&
            (parentProps as RuleProps).rule.op !== 'notNull' &&
            (parentProps as RuleProps).rule.type === 'column'
        },
        typeSelector: {
          component: ValueDropDown,
          name: 'type',
          options: [{name: 'column', label: 'Column'}, {name: 'value', label: 'Value'}],
          className: 'dropdown',
          position: 4,
          defaultValue: 'value',
        }
      }
    } />
);
```
