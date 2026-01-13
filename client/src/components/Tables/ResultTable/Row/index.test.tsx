import { render } from '@testing-library/react';

import ResultTableRow from './';
import type { CourseResult } from '../../../../types/courseResult';

describe('<ResultTableRow />', () => {
  test('renders correctly', () => {
    const result: CourseResult = {
      name: 'Test Result',
      score: 15,
      learnerId: '123',
      id: '456'
    }
    
    const setSelectedResult = vi.fn();
    const setShowResultModal = vi.fn();
    const setShowUserModal = vi.fn();

    const { getByTestId, getAllByTestId } = render(
      <ResultTableRow
        result={result}
        setSelectedResult={setSelectedResult}
        setShowResultModal={setShowResultModal}
        setShowUserModal={setShowUserModal}
      />
    );

    expect(getByTestId('result-table-row')).toBeInTheDocument()
    expect(getAllByTestId('result-table-row-cell')).toHaveLength(2)
    expect(getAllByTestId('result-table-row-cell')[0]).toHaveTextContent('Test Result')
    expect(getAllByTestId('result-table-row-cell')[1]).toHaveTextContent('15')
  });
});
