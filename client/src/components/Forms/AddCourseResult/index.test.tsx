import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import AddCourseResultForm from './';
import type { User } from '../../../types/user';

describe('<AddCourseResultForm />', () => {
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

    const { getByTestId, getAllByTestId } = render(
      <MockedProvider mocks={[]}>
        <AddCourseResultForm
          user={user}
          setShowAddCourseResultModal={setShowAddCourseResultModal}
          setShowUserModal={setShowUserModal}
        />
      </MockedProvider>
    );

    expect(getByTestId('add-result-form')).toBeInTheDocument()
    expect(getByTestId('add-result-form-inputs')).toBeInTheDocument()
    expect(getAllByTestId('input-label')[0]).toHaveTextContent('Course Name')
    expect(getAllByTestId('input-label')[1]).toHaveTextContent('Course Score')
    expect(getByTestId('add-result-form-back-button')).toBeInTheDocument()
  });
});
