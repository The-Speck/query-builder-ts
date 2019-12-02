import { RuleGroupElements } from '../../models';
import defaultAddGroupAction from './addGroupAction';
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
