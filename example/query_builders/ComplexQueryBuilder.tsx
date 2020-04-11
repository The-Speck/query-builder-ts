import * as React from 'react';
import QueryBuilder, {
  ControlProps,
  Defaults,
  RuleGroupCondition,
  ValueComboBox,
  ValueDropDown,
  ValueInput,
} from '../../.';

export default (): React.ReactElement => {
  const [query, setQuery] = React.useState<RuleGroupCondition | undefined>(
    undefined,
  );

  const PrettyPrintJson = React.useCallback(
    () =>
      query ? (
        <div>
          <pre>{JSON.stringify(query, null, 2)}</pre>
        </div>
      ) : null,
    [query],
  );

  const columns = [
    { databaseName: 'firstName', displayName: 'First Name', type: 'string' },
    { databaseName: 'lastName', displayName: 'Last Name', type: 'string' },
    { databaseName: 'address', displayName: 'Address', type: 'string' },
    { databaseName: 'age', displayName: 'Age', type: 'number' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: '4rem',
        paddingLeft: '4rem',
      }}>
      <div
        style={{
          width: '100%',
          maxWidth: '90rem',
        }}>
        <QueryBuilder
          // query={query}
          onQueryChange={setQuery}
          rules={[
            {
              component: ValueComboBox,
              name: 'column',
              position: 1,
              props: {
                className: {
                  input: '',
                  dropdownContainer: 'filteredOptionsContainer',
                  container: 'comboBoxContainer',
                  ul: 'filteredOptionsList',
                  li: 'filteredOptionsItem',
                },
                options: columns,
                defaultValue: {},
                mapInput: (value: any, props: any): string =>
                  value.displayName || '',
                mapOutput: (value: string, props: any): any =>
                  columns.find((c: any) => c.displayName === value) || '',
              },
            },
            Defaults.RULE.OPERATOR,
            {
              component: ValueInput,
              name: 'value',
              position: 3,
              props: {
                className: '',
                label: 'Value',
                defaultValue: '',
                inputType: (value: any, props: any): string =>
                  props.parentProps.rule.column.type,
                condition: ({ parentProps }: ControlProps): boolean =>
                  (parentProps as any).rule.op !== 'null' &&
                  (parentProps as any).rule.op !== 'notNull' &&
                  (parentProps as any).rule.type !== 'column',
              },
            },
            {
              component: ValueComboBox,
              name: 'value',
              position: 3,
              props: {
                className: {
                  input: '',
                  dropdownContainer: 'filteredOptionsContainer',
                  container: 'comboBoxContainer',
                  ul: 'filteredOptionsList',
                  li: 'filteredOptionsItem',
                },
                defaultValue: '',
                options: columns,
                condition: ({ parentProps }: ControlProps): boolean =>
                  (parentProps as any).rule.op !== 'null' &&
                  (parentProps as any).rule.op !== 'notNull' &&
                  (parentProps as any).rule.type === 'column',
                mapInput: (value: any, props: any): string =>
                  value.displayName || '',
                mapOutput: (value: string, props: any): any =>
                  columns.find((c: any) => c.displayName === value) || value,
              },
            },
            {
              component: ValueDropDown,
              name: 'type',
              position: 4,
              props: {
                defaultValue: 'value',
                options: [
                  { name: 'column', label: 'Column' },
                  { name: 'value', label: 'Value' },
                ],
                className: 'dropdown',
                condition: ({ parentProps }: ControlProps): boolean =>
                  (parentProps as any).rule.op !== 'null' &&
                  (parentProps as any).rule.op !== 'notNull',
              },
            },
            Defaults.RULE.REMOVE,
          ]}
        />
      </div>
      {PrettyPrintJson()}
    </div>
  );
};
