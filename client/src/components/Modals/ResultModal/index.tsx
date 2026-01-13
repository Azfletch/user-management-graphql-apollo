import { useState, type Dispatch, type SetStateAction } from 'react'
import { useMutation } from '@apollo/client'

import Button from '../../Button'
import Close from '../../Icons/Close'
import UpdateCourseResultForm from '../../Forms/UpdateCourseResult'
import { GET_USERS } from '../../../queries/users'
import { DELETE_COURSE_RESULT } from '../../../queries/courseResults'
import type { CourseResult } from '../../../types/courseResult'

import './index.scss'

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
    <div className='result-modal' data-test-id='result-modal'>
      <button
        className='result-modal-overlay'
        onClick={() => setShowResultModal(false)}
      />

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
            <div className='result-modal-content-current-score' data-test-id='result-modal-content-current-score'>
              Current Score: {score}
            </div>
            <div className='result-modal-content-controls'>
              <Button
                dataTestId='result-modal-back-button'
                onClick={() => {
                  setShowUserModal(true)
                  setShowResultModal(false)
                }}
                isSecondary
              >
                Back
              </Button>
              <div>
                <Button
                  dataTestId='result-modal-update-button'
                  onClick={() => setIsInUpdateResultMode(true)} className='result-modal-content-controls-edit'>
                  Update Result
                </Button>

                <Button
                  className='result-modal-content-body-button-delete'
                  dataTestId='result-modal-delete-button'
                  isDanger
                  onClick={handleDelete}
                >
                  Delete Result
                </Button>
              </div>
            </div>

          </div>
        ) : (
          <div className='result-modal-content-body'>
              <UpdateCourseResultForm
                result={result}
                setShowUserModal={setShowUserModal}
                setShowResultModal={setShowResultModal}
                setIsInUpdateResultMode={setIsInUpdateResultMode}
              />
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
