import { render } from '@testing-library/react';

import UserTableRow from './';
import type { User } from '../../../../types/user';

describe('<UserTableRow />', () => {
  test('renders correctly', () => {
    const user: User = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@test.com',
      id: '123',
      courseResults: []
    }
    
    const setSelectedUser = vi.fn();
    const setShowUserModal = vi.fn();

    const { getByTestId, getAllByTestId } = render(
      <UserTableRow
        user={user}
        setShowUserModal={setShowUserModal}
        setSelectedUser={setSelectedUser}
      />
    );

    expect(getByTestId('user-table-row')).toBeInTheDocument()
    expect(getAllByTestId('user-table-row-cell')).toHaveLength(3)
    expect(getAllByTestId('user-table-row-cell')[0]).toHaveTextContent('Test')
    expect(getAllByTestId('user-table-row-cell')[1]).toHaveTextContent('User')
    expect(getAllByTestId('user-table-row-cell')[2]).toHaveTextContent('testuser@test.com')
  });
});
