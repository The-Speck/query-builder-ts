import * as React from 'react';
import * as ReactDOM from 'react-dom';
import QueryBuilder from '../src/index';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<QueryBuilder />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
