import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import AddUserModal from './';

describe('<AddUserModal />', () => {
  test('renders correctly', () => {
    const setShowAddUserModal = vi.fn();

    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <AddUserModal
          setShowAddUserModal={setShowAddUserModal}
        />
      </MockedProvider>
    );

    expect(getByTestId('add-user-modal')).toBeInTheDocument()
    expect(getByTestId('add-user-form')).toBeInTheDocument()
  });
});
