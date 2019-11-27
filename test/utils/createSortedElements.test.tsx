import { ValueComboBox } from '../../src';
import { ControlElement, RuleElements } from '../../src/models';
import { createSortedElements } from '../../src/utils';

describe('it', () => {
  it('creates sorted elements', () => {
    const rules: RuleElements = {
      columnSelector: {
        component: ValueComboBox,
        position: 3,
        name: '3',
      },
      operatorSelector: {
        component: ValueComboBox,
        position: 1,
        name: '1',
      },
      valueEditor: {
        component: ValueComboBox,
        position: 2,
        name: '2',
      },
      removeRuleAction: {
        component: ValueComboBox,
        position: 4,
        name: '4',
      },
    };

    const sortedElements = createSortedElements(rules);
    sortedElements.forEach((e: ControlElement, idx: number) =>
      expect(e.name === `${idx + 1}`).toBeTruthy(),
    );
  });
});
