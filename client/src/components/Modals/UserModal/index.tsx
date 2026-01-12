import { useState, type Dispatch, type SetStateAction } from 'react'
import { useMutation } from '@apollo/client'

import Close from '../../Icons/Close'
import UpdateUserForm from '../../Forms/UpdateUser'
import ResultTable from '../../Tables/ResultTable'
import { DELETE_USER, GET_USERS } from '../../../queries/users'
import type { CourseResult, User } from '../../../types/user'

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
    <div className='user-modal'>
      <button className='user-modal-overlay' onClick={() => setShowUserModal(false)}></button>

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
                <div className='user-modal-content-course-results-text'>
                  No Course Results Recorded!
                </div>
              }
            </div>

            <div className='user-modal-content-controls'>
              <div>
                <button onClick={() => setIsInUpdateUserMode(true)} className='user-modal-content-controls-edit'>
                  Update User
                </button>

                <button onClick={handleDelete} className='user-modal-content-body-button-delete'>
                  Delete User
                </button>
              </div>

              <button
                onClick={() => {
                  setShowUserModal(false)
                  setShowAddCourseResultModal(true)
                }}
                className='user-modal-content-body-button-add-course'
              >
                Add Course Result
              </button>
            </div>

          </div>
        ) : (
          <div className='user-modal-content-body'>
              <UpdateUserForm user={user} setShowUserModal={setShowUserModal} />
              <button onClick={() => setIsInUpdateUserMode(false)}>Back</button>
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