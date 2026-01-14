import { render, waitFor } from '@testing-library/react';

import Users from './';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USERS } from '../../queries/users';
import { GraphQLError } from 'graphql';

const successMock = [
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

const loadingMock = [
  {
    delay: Infinity,
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

const errorMock = [
  {
    request: {
      query: GET_USERS,
    },
    result: {
      errors: [new GraphQLError("Error!")],
    },
  },
];

describe('<Users />', () => {
  test('renders correctly', async () => {
    const setShowAddUserModal = vi.fn();

    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <MockedProvider mocks={successMock}>
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

  test('displays a loading state', async () => {
    const setShowAddUserModal = vi.fn();

    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={loadingMock}>
        <Users
          showAddUserModal={false}
          setShowAddUserModal={setShowAddUserModal}
        />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByTestId('users-loading')).toBeInTheDocument()
      expect(getByTestId('loading-icon')).toBeInTheDocument()
      expect(queryByTestId('users')).not.toBeInTheDocument()
    })
  });

  test('displays an error state', async () => {
    const setShowAddUserModal = vi.fn();

    const { getByTestId, queryByTestId } = render(
      <MockedProvider mocks={errorMock}>
        <Users
          showAddUserModal={false}
          setShowAddUserModal={setShowAddUserModal}
        />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByTestId('users-error')).toBeInTheDocument()
      expect(getByTestId('alert-icon')).toBeInTheDocument()
      expect(queryByTestId('users')).not.toBeInTheDocument()
    })
  });

  test('can display the add user modal', async () => {
    const setShowAddUserModal = vi.fn();

    const { getByTestId } = render(
      <MockedProvider mocks={successMock}>
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
