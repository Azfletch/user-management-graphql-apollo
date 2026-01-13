import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

import ResultTableRow from '../Row';
import type { CourseResult } from '../../../../types/courseResult'
import { sortCourseResults } from '../../../../lib/sorting';

const ResultTableRows = ({ results, sortKey, isReverse, setShowUserModal, setSelectedResult, setShowResultModal }: Props) => {
  const [sortedResults, setSortedResults] = useState<CourseResult[]>(results);

  useEffect(() => {
    setSortedResults(sortCourseResults(JSON.parse(JSON.stringify(results)), sortKey, isReverse))
  }, [sortKey, isReverse, results])

  if (results.length === 0) {
    return null
  }

  return (
    <div
      className='result-table-rows'
      data-test-id='result-table-rows'
    >
      {sortedResults.map((result: CourseResult, index) =>
        <ResultTableRow
          key={index}
          result={result}
          setSelectedResult={setSelectedResult}
          setShowResultModal={setShowResultModal}
          setShowUserModal={setShowUserModal}
        />
      )}
    </div>
  )
}

type Props = {
  results: CourseResult[]
  sortKey: string
  isReverse: boolean
  setShowUserModal: Dispatch<SetStateAction<boolean>>
  setShowResultModal: Dispatch<SetStateAction<boolean>>
  setSelectedResult: Dispatch<SetStateAction<CourseResult>>
}

export default ResultTableRows
