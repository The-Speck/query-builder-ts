export interface IOperator {
  name: string;
  label: string;
}

export const defaultOperators: IOperator[] = [
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

export default defaultOperators;
