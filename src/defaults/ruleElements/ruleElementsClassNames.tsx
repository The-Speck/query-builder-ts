import style from '../../style.module.css';

export const ruleElementsClassNames = {
  combinators: '',
  columns: {
    input: '',
    dropdownContainer: style.filteredOptionsContainer,
    container: style.comboBoxContainer,
    ul: style.filteredOptionsList,
    li: style.filteredOptionsItem,
  },
  operators: style.dropdown,
  value: '',
  removeRule: '',
};

export default ruleElementsClassNames;
