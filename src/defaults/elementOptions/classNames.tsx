import ClassNames from '../../models/ClassNamesInterface';
import { IRuleGroupProps } from '../../RuleGroup';

export const defaultClassNames: ClassNames = {
  queryBuilder: '',

  ruleGroup: '',

  ruleGroupRow: (props: IRuleGroupProps): string =>
    props.level > 0 ? 'ruleGroup' : '',

  ruleRow: '',
};

export default defaultClassNames;
