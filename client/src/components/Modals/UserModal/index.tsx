import { useState, type Dispatch, type SetStateAction } from 'react'
import { useMutation } from '@apollo/client'

import Button from '../../Button'
import Close from '../../Icons/Close'
import ResultTable from '../../Tables/ResultTable'
import UpdateUserForm from '../../Forms/UpdateUser'
import { DELETE_USER, GET_USERS } from '../../../queries/users'
import type { CourseResult } from '../../../types/courseResult'
import type { User } from '../../../types/user'

import './index.scss'

const UserModal = ({ user, setShowUserModal, setShowAddCourseResultModal, setSelectedResult, setShowResultModal }: Props) => {
  const { firstName, lastName, courseResults } = user
  const fullName = `${firstName} ${lastName}`
  const hasCourseResults = courseResults.length > 0
  const [deleteUser] = useMutation(DELETE_USER, {
      refetchQueries: [GET_USERS]
    })
  const [isInUpdateUserMode, setIsInUpdateUserMode] = useState<boolean>(false);


  const handleDelete = () => {
    deleteUser({
      variables: { id: user.id }
    })
    setShowUserModal(false)
  }

  return (
    <div className='user-modal' data-test-id='user-modal'>
      <button
        className='user-modal-overlay'
        onClick={() => setShowUserModal(false)}
      />

      <div className='user-modal-content'>
        <div className='user-modal-content-header'>
          <div className='user-modal-content-header-title'>
            {fullName}
          </div>

          <button className='user-modal-content-header-button' onClick={() => setShowUserModal (false)}>
            <Close />
          </button>
        </div>

        {!isInUpdateUserMode ? (
          <div className='user-modal-content-body'>
            <div className='user-modal-content-course-results'>
              {hasCourseResults ?
                <ResultTable
                  results={courseResults}
                  setShowUserModal={setShowUserModal}
                  setSelectedResult={setSelectedResult}
                  setShowResultModal={setShowResultModal}
                /> :
                <div className='user-modal-content-course-results-text' data-test-id='user-modal-content-course-results-text'>
                  No Course Results Recorded!
                </div>
              }
            </div>

            <div className='user-modal-content-controls'>
              <div>
                <Button
                  dataTestId='user-modal-update-button'
                  className='user-modal-content-controls-update'
                  isSecondary
                  onClick={() => setIsInUpdateUserMode(true)}
                >
                  Update User
                </Button>
                  
                <Button
                  dataTestId='user-modal-delete-button'
                  isDanger
                  onClick={handleDelete}
                >
                  Delete User
                </Button>
              </div>

              
              <Button
                onClick={() => {
                  setShowUserModal(false)
                  setShowAddCourseResultModal(true)
                }}
              >
                Add Course Result
              </Button>
            </div>

          </div>
        ) : (
          <div className='user-modal-content-body'>
              <UpdateUserForm
                user={user}
                setShowUserModal={setShowUserModal}
                setIsInUpdateUserMode={setIsInUpdateUserMode}
              />
          </div>
        )}
      </div>
    </div>
  )
}

type Props = {
  user: User
  setShowUserModal: Dispatch<SetStateAction<boolean>>
  setShowAddCourseResultModal: Dispatch<SetStateAction<boolean>>
  setShowResultModal: Dispatch<SetStateAction<boolean>>
  setSelectedResult: Dispatch<SetStateAction<CourseResult>>
}

export default UserModal
