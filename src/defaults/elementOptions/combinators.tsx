export interface Combinator {
  name: string;
  label: string;
}

export const defaultCombinators: Combinator[] = [
  { name: 'and', label: 'AND' },
  { name: 'or', label: 'OR' },
];

export default defaultCombinators;
