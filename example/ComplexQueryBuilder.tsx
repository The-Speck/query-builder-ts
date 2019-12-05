import * as React from 'react';
import 'react-app-polyfill/ie11';
import QueryBuilder, {
  ControlProps,
  RuleGroupCondition,
  ValueComboBox,
  ValueDropDown,
  ValueInput,
} from '../.';
import '../src/style.module.css';

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
          onQueryChange={setQuery}
          rules={{
            columnSelector: {
              component: ValueComboBox,
              name: 'column',
              className: {
                input: '',
                dropdownContainer: 'filteredOptionsContainer',
                container: 'comboBoxContainer',
                ul: 'filteredOptionsList',
                li: 'filteredOptionsItem',
              },
              options: columns,
              position: 1,
              defaultValue: {},
              mapInput: (value: any, props: any): string =>
                value.displayName || '',
              mapOutput: (value: string, props: any): any =>
                columns.find((c: any) => c.displayName === value) || '',
            },
            valueInput: {
              component: ValueInput,
              name: 'value',
              className: '',
              label: 'Value',
              position: 3,
              defaultValue: '',
              inputType: (value: any, props: any): string =>
                props.parentProps.rule.column.type,
              condition: ({ parentProps }: ControlProps): boolean =>
                (parentProps as any).rule.op !== 'null' &&
                (parentProps as any).rule.op !== 'notNull' &&
                (parentProps as any).rule.type !== 'column',
            },
            valueSelector: {
              component: ValueComboBox,
              name: 'value',
              className: {
                input: '',
                dropdownContainer: 'filteredOptionsContainer',
                container: 'comboBoxContainer',
                ul: 'filteredOptionsList',
                li: 'filteredOptionsItem',
              },
              position: 3,
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
            typeSelector: {
              component: ValueDropDown,
              name: 'type',
              options: [
                { name: 'column', label: 'Column' },
                { name: 'value', label: 'Value' },
              ],
              className: 'dropdown',
              position: 4,
              defaultValue: 'value',
            },
          }}
        />
      </div>
      {PrettyPrintJson()}
    </div>
  );
};
