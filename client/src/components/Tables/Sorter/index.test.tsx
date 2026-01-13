import { render } from '@testing-library/react';

import TableSorter from './';
import { userTableColumns } from '../../../lib/sorting';

describe('<TableSorter />', () => {
  test('renders correctly', () => {
    const setIsReverse = vi.fn();
    const setSortKey = vi.fn();

    const { getByTestId } = render(
      <TableSorter
        sortKey='firstName'
        isReverse
        setIsReverse={setIsReverse}
        setSortKey={setSortKey}
        tableColumns={userTableColumns}
      />
    );

    expect(getByTestId('table-sorter')).toBeInTheDocument()
  });
});
