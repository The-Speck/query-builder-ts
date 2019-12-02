import style from '../../style.module.css';

export const ruleElementsClassNames = {
  combinators: '',
  columns: {
    input: '',
    container: style.filteredOptionsContainer,
    ul: style.filteredOptionsList,
    li: style.filteredOptionsItem,
  },
  operators: style.operator,
  value: '',
  removeRule: '',
};

export default ruleElementsClassNames;
