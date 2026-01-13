import { render, waitFor } from '@testing-library/react';

import Users from './';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USERS } from '../../queries/users';

const mocks = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      data: {
        users: [
          {
            id: '123',
            email: 'testuser@test.com',
            firstName: 'Test',
            lastName: 'User',
            courseResults: [],
          }
        ],
      },
    },
  },
];

describe('<Users />', () => {
  test('renders correctly', async () => {
    const setShowAddUserModal = vi.fn();

    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <MockedProvider mocks={mocks}>
        <Users
          showAddUserModal={false}
          setShowAddUserModal={setShowAddUserModal}
        />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByTestId('users')).toBeInTheDocument()
      expect(getAllByTestId('user-table-row-cell')[0]).toHaveTextContent('Test')
      expect(getAllByTestId('user-table-row-cell')[1]).toHaveTextContent('User')
      expect(getAllByTestId('user-table-row-cell')[2]).toHaveTextContent('testuser@test.com')
      expect(queryByTestId('add-user-modal')).not.toBeInTheDocument()
    })
  });

  test('can display the add user modal', async () => {
    const setShowAddUserModal = vi.fn();

    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <Users
          showAddUserModal={true}
          setShowAddUserModal={setShowAddUserModal}
        />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByTestId('add-user-modal')).toBeInTheDocument()
    })
  });
});
