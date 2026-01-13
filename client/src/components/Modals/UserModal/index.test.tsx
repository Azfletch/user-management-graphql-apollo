import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import UserModal from './';
import type { User } from '../../../types/user';

describe('<UserModal />', () => {
  test('renders correctly', () => {
    const user: User = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@test.com',
      id: '123',
      courseResults: []
    }
    const setShowUserModal = vi.fn();
    const setShowAddCourseResultModal = vi.fn();
    const setSelectedResult = vi.fn();
    const setShowResultModal = vi.fn();

    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <UserModal
          user={user}
          setShowUserModal={setShowUserModal}
          setShowAddCourseResultModal={setShowAddCourseResultModal}
          setSelectedResult={setSelectedResult}
          setShowResultModal={setShowResultModal}
        />
      </MockedProvider>
    );

    expect(getByTestId('user-modal')).toBeInTheDocument()
    expect(getByTestId('user-modal-update-button')).toBeInTheDocument()
    expect(getByTestId('user-modal-delete-button')).toBeInTheDocument()
    expect(getByTestId('user-modal-content-course-results-text')).toHaveTextContent('No Course Results Recorded!')
  });

  test('renders a users course results', () => {
    const user: User = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@test.com',
      id: '123',
      courseResults: [{
        name: 'Test Course',
        score: 100,
        learnerId: '123',
        id: '456'
      }]
    }
    const setShowUserModal = vi.fn();
    const setShowAddCourseResultModal = vi.fn();
    const setSelectedResult = vi.fn();
    const setShowResultModal = vi.fn();

    const { getByTestId, getAllByTestId } = render(
      <MockedProvider mocks={[]}>
        <UserModal
          user={user}
          setShowUserModal={setShowUserModal}
          setShowAddCourseResultModal={setShowAddCourseResultModal}
          setSelectedResult={setSelectedResult}
          setShowResultModal={setShowResultModal}
        />
      </MockedProvider>
    );

    expect(getByTestId('result-table')).toBeInTheDocument()
    expect(getByTestId('result-table-row')).toBeInTheDocument()
    expect(getAllByTestId('result-table-row-cell')[0]).toHaveTextContent('Test Course')
    expect(getAllByTestId('result-table-row-cell')[1]).toHaveTextContent('100')
  });

  test('can switch to update mode', async () => {
    const user: User = {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@test.com',
      id: '123',
      courseResults: [{
        name: 'Test Course',
        score: 100,
        learnerId: '123',
        id: '456'
      }]
    }
    const setShowUserModal = vi.fn();
    const setShowAddCourseResultModal = vi.fn();
    const setSelectedResult = vi.fn();
    const setShowResultModal = vi.fn();

    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <UserModal
          user={user}
          setShowUserModal={setShowUserModal}
          setShowAddCourseResultModal={setShowAddCourseResultModal}
          setSelectedResult={setSelectedResult}
          setShowResultModal={setShowResultModal}
        />
      </MockedProvider>
    );

    fireEvent.click(getByTestId('user-modal-update-button'))

    await waitFor(() => {
      expect(getByTestId('update-user-form')).toBeInTheDocument()
    })
  });
});
