import { RuleElements } from '../../models';
import defaultColumnSelector from './columnSelector';
import defaultOperatorSelector from './operatorSelector';
import defaultRemoveRuleAction from './removeRuleAction';
import defaultValueInput from './valueInput';

export const defaultRuleElements: RuleElements = {
  columnSelector: defaultColumnSelector,
  operatorSelector: defaultOperatorSelector,
  valueInput: defaultValueInput,
  removeRuleAction: defaultRemoveRuleAction,
};

export default defaultRuleElements;
