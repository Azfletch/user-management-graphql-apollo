import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import AddUserForm from './';

describe('<AddUserForm />', () => {
  test('renders correctly', () => {
    const setShowUserModal = vi.fn();

    const { getByTestId, getAllByTestId } = render(
      <MockedProvider mocks={[]}>
        <AddUserForm
          setShowAddUserModal={setShowUserModal}
        />
      </MockedProvider>
    );

    expect(getByTestId('add-user-form')).toBeInTheDocument()
    expect(getByTestId('add-user-form-inputs')).toBeInTheDocument()
    expect(getAllByTestId('input-label')[0]).toHaveTextContent('First Name')
    expect(getAllByTestId('input-label')[1]).toHaveTextContent('Last Name')
    expect(getAllByTestId('input-label')[2]).toHaveTextContent('Email')
  });
});
