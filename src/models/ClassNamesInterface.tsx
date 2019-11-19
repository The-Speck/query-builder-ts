export type classNameFunction = (...args: any[]) => string | string[];

export interface ClassNames {
  queryBuilder?: string | string[] | classNameFunction;

  ruleGroup?: string | string[] | classNameFunction;
  ruleGroupRow?: string | string[] | classNameFunction;

  ruleRow?: string | string[] | classNameFunction;
}

export default ClassNames;
