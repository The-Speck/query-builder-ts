import { ControlElement } from '../../models';
import defaultAddGroupAction from './addGroupAction';
import defaultAddRuleAction from './addRuleAction';
import defaultCombinatorSelector from './combinatorSelector';
import defaultRemoveGroupAction from './removeGroupAction';

export interface DefaultRuleGroupElements {
  COMBINATOR: ControlElement;
  ADD_RULE: ControlElement;
  ADD_GROUP: ControlElement;
  REMOVE: ControlElement;
}

export const DEFAULT_RULE_GROUP: DefaultRuleGroupElements = {
  COMBINATOR: defaultCombinatorSelector,
  ADD_RULE: defaultAddRuleAction,
  ADD_GROUP: defaultAddGroupAction,
  REMOVE: defaultRemoveGroupAction,
};

export default DEFAULT_RULE_GROUP;
