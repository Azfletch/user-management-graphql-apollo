import { render } from '@testing-library/react';

import ResultTable from './';
import type { CourseResult } from '../../../types/courseResult';

describe('<ResultTable />', () => {
  test('renders correctly', () => {
    const results: CourseResult[] = [
      {
        name: 'Test Result',
        score: 15,
        learnerId: '123',
        id: '456'
      },
      {
        name: 'Another Result',
        score: 90,
        learnerId: '123',
        id: '789'
      }
    ]
    
    const setSelectedResult = vi.fn();
    const setShowResultModal = vi.fn();
    const setShowUserModal = vi.fn();

    const { getByTestId } = render(
      <ResultTable
        results={results}
        setSelectedResult={setSelectedResult}
        setShowResultModal={setShowResultModal}
        setShowUserModal={setShowUserModal}
      />
    );

    expect(getByTestId('result-table')).toBeInTheDocument()
    expect(getByTestId('table-sorter')).toBeInTheDocument()
    expect(getByTestId('result-table-rows')).toBeInTheDocument()
  });
});
