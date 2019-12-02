import { ControlElement } from '.';

export interface RuleElements {
  removeRuleAction: ControlElement;
  [ElementName: string]: ControlElement;
}

export interface RuleGroupElements {
  combinatorSelector: ControlElement;
  addRuleAction: ControlElement;
  addGroupAction: ControlElement;
  removeGroupAction: ControlElement;
  [ElementName: string]: ControlElement;
}
