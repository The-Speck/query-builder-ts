import { RuleGroupElements } from '../../models/RuleGroupElementsInterface';
import defaultAddGroupAction from './AddGroupAction';
import defaultAddRuleAction from './addRuleAction';
import defaultCombinatorSelector from './combinatorSelector';
import defaultRemoveGroupAction from './removeGroupAction';

export const defaultRuleGroupElements: RuleGroupElements = {
  combinatorSelector: defaultCombinatorSelector,
  addRuleAction: defaultAddRuleAction,
  addGroupAction: defaultAddGroupAction,
  removeGroupAction: defaultRemoveGroupAction,
};

export default defaultRuleGroupElements;
