import RuleElements from '../../models/RuleElements';
import defaultColumnSelector from './columnSelector';
import defaultOperatorSelector from './operatorSelector';
import defaultRemoveRuleAction from './removeRuleAction';
import defaultValueInput from './valueInput';

export const defaultRuleElements: RuleElements = {
  columnSelector: defaultColumnSelector,
  operatorSelector: defaultOperatorSelector,
  valueEditor: defaultValueInput,
  removeRuleAction: defaultRemoveRuleAction,
};

export default defaultRuleElements;
