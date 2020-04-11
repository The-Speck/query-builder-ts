import { MultiTypeCallback } from './miscellaneous';

export interface QueryBuilderClassNames {
  queryBuilder?: MultiTypeCallback<string | string[]>;

  ruleGroup?: MultiTypeCallback<string | string[]>;
  ruleGroupRow?: MultiTypeCallback<string | string[]>;

  ruleRow?: MultiTypeCallback<string | string[]>;
}
