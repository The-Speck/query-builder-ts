export type TClassNameFunction = (arg: any) => string | string[];
export type TClassName = string | string[] | TClassNameFunction;

export interface ClassNames {
  queryBuilder?: TClassName;

  ruleGroup?: TClassName;
  ruleGroupRow?: TClassName;

  ruleRow?: TClassName;
}

export default ClassNames;
