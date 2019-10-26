import { ControlElement } from '.';

export interface RuleElements {
  removeRuleAction: ControlElement;
  [ElementName: string]: ControlElement;
}

export default RuleElements;
