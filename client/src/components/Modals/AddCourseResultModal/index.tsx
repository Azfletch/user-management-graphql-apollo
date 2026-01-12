import type { Dispatch, SetStateAction } from 'react'

import Close from '../../Icons/Close'
import AddCourseResultForm from '../../Forms/AddCourseResult'
import type { User } from '../../../types/user'

import './index.scss'

const AddCourseResultModal = ({ setShowAddCourseResultModal, setShowUserModal, user }: Props) => {
  return (
    <div className='add-course-result-modal'>
      <button
        className='add-course-result-modal-overlay'
        onClick={() => setShowAddCourseResultModal(false)}
      />

      <div className='add-course-result-modal-content'>
        <div className='add-course-result-modal-content-header'>
          <div className='add-course-result-modal-content-header-title'>
            Add Course Result
          </div>

          <button className='add-course-result-modal-content-header-button' onClick={() => {
              setShowAddCourseResultModal(false)
            }}
          >
            <Close />
          </button>
        </div>

        <div className='add-course-result-modal-content-form'>
          <AddCourseResultForm
            user={user}
            setShowAddCourseResultForm={setShowAddCourseResultModal}
            setShowUserModal={setShowUserModal}
          />
        </div>

        <button onClick={() => {
          setShowUserModal(true)
          setShowAddCourseResultModal(false)
        }}>
          Back To User Modal
        </button>
      </div>
    </div>
  )
}

type Props = {
  user: User
  setShowAddCourseResultModal: Dispatch<SetStateAction<boolean>>
  setShowUserModal: Dispatch<SetStateAction<boolean>>
}

export default AddCourseResultModal
