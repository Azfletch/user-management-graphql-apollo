import type { Dispatch, SetStateAction } from 'react'

import { courseResultTableColumns } from '../../../../lib/sorting'
import type { CourseResult } from '../../../../types/user'

import './index.scss'

const ResultTableRow = ({ result, setSelectedResult, setShowResultModal, setShowUserModal }: Props) => {
  const handleRowClick = () => {
    setSelectedResult(result)
    setShowResultModal(true)
    setShowUserModal(false)
  }

  return (
    <div className='result-table-row' onClick={handleRowClick} >
      {courseResultTableColumns.map((column, index) => {
        const value = String(result[column.sortKey as keyof CourseResult])

        return (
          <div className='result-table-row-cell' key={index}>{value}</div>
        )
      })}
    </div>
  )
}

type Props = {
  result: CourseResult
  setShowResultModal: Dispatch<SetStateAction<boolean>>
  setSelectedResult: Dispatch<SetStateAction<CourseResult>>
  setShowUserModal: Dispatch<SetStateAction<boolean>>
}

export default ResultTableRow
