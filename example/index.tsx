import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import '../src/style.module.css';
import ComplexQueryBuilder from './query_builders/ComplexQueryBuilder';
import SimpleQuerybuilder from './query_builders/SimpleQuerybuilder';

const SIMPLE = 'simple';
const COMPLEX = 'complex';

const App = (): React.ReactElement => {
  const [queryType, setQueryType] = React.useState<string>(SIMPLE);

  const renderQueryBuilder = (): React.ReactNode => {
    switch (queryType) {
      case SIMPLE:
        return <SimpleQuerybuilder />;
      case COMPLEX:
        return <ComplexQueryBuilder />;
      default:
        return 'wtf';
    }
  };

  return (
    <div>
      <select
        onChange={(e: React.FormEvent<HTMLSelectElement>): void =>
          setQueryType(e.currentTarget.value)
        }>
        <option value={SIMPLE}>Simple</option>
        <option value={COMPLEX}>Complex</option>
      </select>
      {renderQueryBuilder()}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
