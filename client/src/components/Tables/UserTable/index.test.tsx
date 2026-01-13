import { render } from '@testing-library/react';

import UserTable from './';
import type { User } from '../../../types/user';

describe('<UserTable />', () => {
  test('renders correctly', () => {
    const users: User[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        id: '123',
        courseResults: []
      },
      {
        firstName: 'Mike',
        lastName: 'Smith',
        email: 'mike@example.com',
        id: '123',
        courseResults: []
      }
    ]

    const { getByTestId, getAllByTestId } = render(
      <UserTable
        users={users}
      />
    );

    expect(getByTestId('user-table')).toBeInTheDocument()
    expect(getAllByTestId('user-table-row')).toHaveLength(2)
    expect(getAllByTestId('user-table-row-cell')).toHaveLength(6)
    expect(getAllByTestId('user-table-row-cell')[0]).toHaveTextContent('Mike')
    expect(getAllByTestId('user-table-row-cell')[1]).toHaveTextContent('Smith')
    expect(getAllByTestId('user-table-row-cell')[2]).toHaveTextContent('mike@example.com')
    expect(getAllByTestId('user-table-row-cell')[3]).toHaveTextContent('John')
    expect(getAllByTestId('user-table-row-cell')[4]).toHaveTextContent('Doe')
    expect(getAllByTestId('user-table-row-cell')[5]).toHaveTextContent('john@test.com')
  });
});
