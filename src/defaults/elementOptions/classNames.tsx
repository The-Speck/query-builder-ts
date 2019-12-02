import { QueryBuilderClassNames } from '../../models';
import { RuleGroupProps } from '../../RuleGroup';
import styles from '../../style.module.css';

export const defaultClassNames: QueryBuilderClassNames = {
  queryBuilder: styles.ruleGroupRow,

  ruleGroup: (props: RuleGroupProps): string =>
    props.level > 0 ? styles.ruleGroupRow : '',

  ruleGroupRow: '',

  ruleRow: styles.rule,
};

export default defaultClassNames;
