import ClassNames from '../../models/ClassNamesInterface';
import { IRuleGroupProps } from '../../RuleGroup';
import styles from '../../style.module.css';

export const defaultClassNames: ClassNames = {
  queryBuilder: styles.ruleGroupRow,

  ruleGroup: (props: IRuleGroupProps): string =>
    props.level > 0 ? styles.ruleGroupRow : '',

  ruleGroupRow: '',

  ruleRow: styles.rule,
};

export default defaultClassNames;
