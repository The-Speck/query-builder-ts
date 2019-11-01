import { ControlElement } from '.';

export interface RuleGroupElements {
  combinatorSelector: ControlElement;
  addRuleAction: ControlElement;
  addGroupAction: ControlElement;
  removeGroupAction: ControlElement;
  [ElementName: string]: ControlElement;
}

export default RuleGroupElements;
