import * as faker from 'faker';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import QueryBuilder from '../.';
// import '../src/style.css';

const App = (): React.ReactElement => {
  const names: string[] = [];

  for (let i = 0; i < 25; i++) {
    names.push(faker.name.findName());
  }

  return (
    <div>
      <QueryBuilder
        columns={names}
        onQueryChange={(query: any): void => console.log(query)}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
