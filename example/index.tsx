import * as faker from 'faker';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import QueryBuilder from '../.';

const App = (): React.ReactElement => {
  const [query, setQuery] = React.useState(null);
  const names: string[] = [];

  for (let i = 0; i < 25; i++) {
    names.push(faker.name.findName());
  }

  const PrettyPrintJson = React.useCallback(
    () =>
      query ? (
        <div>
          <pre>{JSON.stringify(query, null, 2)}</pre>
        </div>
      ) : null,
    [query],
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: '4rem',
        paddingLeft: '4rem',
      }}>
      <div
        style={{
          width: '100%',
          maxWidth: '90rem',
        }}>
        <QueryBuilder columns={names} onQueryChange={setQuery} query={query} />
      </div>
      {PrettyPrintJson()}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
