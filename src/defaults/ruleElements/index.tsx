import { RuleGroupElement } from '../../models';
import defaultColumnSelector from './columnSelector';
import defaultOperatorSelector from './operatorSelector';
import defaultRemoveRuleAction from './removeRuleAction';
import defaultValueInput from './valueInput';

export interface DefaultRuleElements {
  COLUMN: RuleGroupElement;
  OPERATOR: RuleGroupElement;
  VALUE: RuleGroupElement;
  REMOVE: RuleGroupElement;
}

export const DEFAULT_RULE: DefaultRuleElements = {
  COLUMN: defaultColumnSelector,
  OPERATOR: defaultOperatorSelector,
  VALUE: defaultValueInput,
  REMOVE: defaultRemoveRuleAction,
};

export default DEFAULT_RULE;
