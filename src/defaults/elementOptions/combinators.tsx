export interface ICombinator {
  name: string;
  label: string;
}

export const defaultCombinators: ICombinator[] = [
  { name: 'and', label: 'AND' },
  { name: 'or', label: 'OR' },
];

export default defaultCombinators;
