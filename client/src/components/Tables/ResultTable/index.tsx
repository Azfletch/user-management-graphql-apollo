import { useState, type Dispatch, type SetStateAction } from 'react';

import ResultTableRows from './Rows';
import TableSorter from '../Sorter';
import { courseResultTableColumns } from '../../../lib/sorting';
import type { CourseResult } from '../../../types/courseResult';

import './index.scss';

const ResultTable = ({ results, setShowUserModal, setSelectedResult, setShowResultModal }: Props) => {
  const defaultSortKey = 'name';
  const [sortKey, setSortKey] = useState<string>(defaultSortKey)
  const [isReverse, setIsReverse] = useState<boolean>(true)

  return (
    <div className='result-table' data-test-id='result-table'>
      <TableSorter
        isReverse={isReverse}
        setIsReverse={setIsReverse}
        setSortKey={setSortKey}
        sortKey={sortKey}
        tableColumns={courseResultTableColumns}
      />
      <ResultTableRows
        results={results}
        sortKey={sortKey}
        isReverse={isReverse}
        setShowUserModal={setShowUserModal}
        setSelectedResult={setSelectedResult}
        setShowResultModal={setShowResultModal}
      />
    </div>
  )
}

type Props = {
  results: CourseResult[]
  setShowUserModal: Dispatch<SetStateAction<boolean>>
  setSelectedResult: Dispatch<SetStateAction<CourseResult>>
  setShowResultModal: Dispatch<SetStateAction<boolean>>
}

export default ResultTable
