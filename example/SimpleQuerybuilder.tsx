import * as React from 'react';
import QueryBuilder, { RuleGroupCondition } from '../.';

export default (): React.ReactElement => {
  const [query, setQuery] = React.useState<RuleGroupCondition | undefined>(
    undefined,
  );
  const columns: any[] = ['First Name', 'Last Name', 'Address'];

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
        <QueryBuilder
          columns={columns}
          query={query}
          onQueryChange={setQuery}
        />
      </div>
      {PrettyPrintJson()}
    </div>
  );
};
