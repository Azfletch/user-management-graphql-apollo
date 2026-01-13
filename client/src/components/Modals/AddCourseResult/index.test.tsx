import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import AddCourseResultModal from '.';
import type { User } from '../../../types/user';

describe('<AddCourseResultModal />', () => {
  test('renders correctly', () => {
    const user: User = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@test.com',
      id: '123',
      courseResults: []
    }
    const setShowAddCourseResultModal = vi.fn();
    const setShowUserModal = vi.fn();

    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <AddCourseResultModal
          user={user}
          setShowAddCourseResultModal={setShowAddCourseResultModal}
          setShowUserModal={setShowUserModal}
        />
      </MockedProvider>
    );

    expect(getByTestId('add-course-result-modal')).toBeInTheDocument()
    expect(getByTestId('add-result-form')).toBeInTheDocument()
  });
});
