import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';

import App from './';
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

describe('<App />', () => {
  test('renders correctly', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByTestId('app')).toBeInTheDocument()
    })
  });

  test('renders a header', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByTestId('app-header')).toBeInTheDocument()
    })
  });

  test('renders a users page', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(getByTestId('users')).toBeInTheDocument()
    })
  });
});
