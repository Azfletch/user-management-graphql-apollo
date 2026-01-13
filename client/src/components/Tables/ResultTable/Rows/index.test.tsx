import { render } from '@testing-library/react';
import ResultTableRows from './';
import type { CourseResult } from '../../../../types/courseResult';

describe('<ResultTableRows />', () => {
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

    const { getByTestId, getAllByTestId } = render(
      <ResultTableRows
        results={results}
        sortKey='score'
        isReverse
        setSelectedResult={setSelectedResult}
        setShowResultModal={setShowResultModal}
        setShowUserModal={setShowUserModal}
      />
    );

    expect(getByTestId('result-table-rows')).toBeInTheDocument()
    expect(getAllByTestId('result-table-row')).toHaveLength(2)
    expect(getAllByTestId('result-table-row-cell')).toHaveLength(4)
    expect(getAllByTestId('result-table-row-cell')[0]).toHaveTextContent('Another Result')
    expect(getAllByTestId('result-table-row-cell')[1]).toHaveTextContent('90')
    expect(getAllByTestId('result-table-row-cell')[2]).toHaveTextContent('Test Result')
    expect(getAllByTestId('result-table-row-cell')[3]).toHaveTextContent('15')
  });
});
