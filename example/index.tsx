import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import QueryBuilder from '../.';

const App = () => {
  return (
    <div>
      <QueryBuilder />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
