import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import ResultModal from './';
import type { CourseResult } from '../../../types/courseResult';

describe('<ResultModal />', () => {
  test('renders correctly', () => {
    const result: CourseResult = {
      name: 'Test Result',
      score: 15,
      learnerId: '123',
      id: '456'
    }
    const setShowUserModal = vi.fn();
    const setShowResultModal = vi.fn();

    const { getByTestId } = render(
      <MockedProvider mocks={[]}>
        <ResultModal
          result={result}
          setShowUserModal={setShowUserModal}
          setShowResultModal={setShowResultModal}
        />
      </MockedProvider>
    );

    expect(getByTestId('result-modal')).toBeInTheDocument()
    expect(getByTestId('result-modal-content-current-score')).toHaveTextContent('Current Score: 15')
    expect(getByTestId('result-modal-back-button')).toBeInTheDocument()
    expect(getByTestId('result-modal-update-button')).toBeInTheDocument()
    expect(getByTestId('result-modal-delete-button')).toBeInTheDocument()
  });
});
