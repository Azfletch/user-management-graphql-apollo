import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import UpdateUserForm from './';
import type { User } from '../../../types/user';

describe('<UpdateUserForm />', () => {
  test('renders correctly', () => {
    const user: User = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@test.com',
      id: '123',
      courseResults: []
    }
    const setShowUserModal = vi.fn();
    const setIsInUpdateUserMode = vi.fn();

    const { getByTestId, getAllByTestId } = render(
      <MockedProvider mocks={[]}>
        <UpdateUserForm
          user={user}
          setShowUserModal={setShowUserModal}
          setIsInUpdateUserMode={setIsInUpdateUserMode}
        />
      </MockedProvider>
    );

    expect(getByTestId('update-user-form')).toBeInTheDocument()
    expect(getByTestId('update-user-form-inputs')).toBeInTheDocument()
    expect(getAllByTestId('input-label')[0]).toHaveTextContent('First Name')
    expect(getAllByTestId('input-label')[1]).toHaveTextContent('Last Name')
    expect(getAllByTestId('input-label')[2]).toHaveTextContent('Email')
    expect(getByTestId('update-user-form-back-button')).toBeInTheDocument()
    expect(getByTestId('update-user-form-submit-button')).toBeInTheDocument()
  });
});
