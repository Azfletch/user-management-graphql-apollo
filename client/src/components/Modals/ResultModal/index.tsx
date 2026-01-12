import { useState, type Dispatch, type SetStateAction } from 'react'
import { useMutation } from '@apollo/client'

import Close from '../../Icons/Close'
import { GET_USERS } from '../../../queries/users'
import type { CourseResult } from '../../../types/user'
import { DELETE_COURSE_RESULT } from '../../../queries/courseResults'

import './index.scss'
import UpdateCourseResultForm from '../../Forms/UpdateCourseResult'

const ResultModal = ({ result, setShowUserModal, setShowResultModal }: Props) => {
  const { name, score, id } = result
  const [deleteCourseResult] = useMutation(DELETE_COURSE_RESULT, {
    refetchQueries: [GET_USERS]
  })
  const [isInUpdateResultMode, setIsInUpdateResultMode] = useState<boolean>(false);


  const handleDelete = () => {
    deleteCourseResult({
      variables: { id }
    })
    setShowResultModal(false)
  }

  return (
    <div className='result-modal'>
      <button className='result-modal-overlay' onClick={() => setShowUserModal(false)}></button>

      <div className='result-modal-content'>
        <div className='result-modal-content-header'>
          <div className='result-modal-content-header-title'>
            {name}
          </div>

          <button className='result-modal-content-header-button' onClick={() => setShowResultModal(false)}>
            <Close />
          </button>
        </div>

        {!isInUpdateResultMode ? (
          <div className='result-modal-content-body'>
            <div className='result-modal-content-current-score'>
              Current Score: {score}
            </div>
            <div className='result-modal-content-controls'>
              <button onClick={() => setIsInUpdateResultMode(true)} className='result-modal-content-controls-edit'>
                Update Result
              </button>

              <button onClick={handleDelete} className='result-modal-content-body-button-delete'>
                Delete Result
              </button>
            </div>

          </div>
        ) : (
          <div className='result-modal-content-body'>
              <UpdateCourseResultForm
                result={result}
                setShowUserModal={setShowUserModal}
                setShowResultModal={setShowResultModal}
              />
            <button onClick={() => setIsInUpdateResultMode(false)}>Back</button>
          </div>
        )}
      </div>
    </div>
  )
}

type Props = {
  result: CourseResult
  setShowResultModal: Dispatch<SetStateAction<boolean>>
  setShowUserModal: Dispatch<SetStateAction<boolean>>
}

export default ResultModal
