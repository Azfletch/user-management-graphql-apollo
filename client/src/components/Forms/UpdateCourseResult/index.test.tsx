import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import UpdateCourseResultForm from './';
import type { CourseResult } from '../../../types/courseResult';

describe('<UpdateCourseResultForm />', () => {
  test('renders correctly', () => {
    const result: CourseResult = {
      name: 'Test Result',
      score: 15,
      learnerId: '123',
      id: '456'
    }
    const setShowResultModal = vi.fn();
    const setShowUserModal = vi.fn();
    const setIsInUpdateResultMode = vi.fn();

    const { getByTestId, getAllByTestId } = render(
      <MockedProvider mocks={[]}>
        <UpdateCourseResultForm
          result={result}
          setShowResultModal={setShowResultModal}
          setShowUserModal={setShowUserModal}
          setIsInUpdateResultMode={setIsInUpdateResultMode}
        />
      </MockedProvider>
    );

    expect(getByTestId('update-result-form')).toBeInTheDocument()
    expect(getByTestId('update-result-form-inputs')).toBeInTheDocument()
    expect(getAllByTestId('input-label')[0]).toHaveTextContent('Course Name')
    expect(getAllByTestId('input-label')[1]).toHaveTextContent('Course Score')
    expect(getByTestId('update-result-form-back-button')).toBeInTheDocument()
    expect(getByTestId('update-result-form-submit-button')).toBeInTheDocument()
  });
});
