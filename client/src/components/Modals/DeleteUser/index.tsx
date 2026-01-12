import type { Dispatch, SetStateAction } from 'react'
import './index.scss'

const DeleteUserModal = ({setShowDeleteUserModal}: Props) => {
  return (
    <div className='delete-user-modal'>
      <button className='delete-user-modal-overlay'></button>

      <div className='delete-user-modal-content'>
        <button onClick={() => setShowDeleteUserModal(false)}>
          close modal
        </button>

        Delete User
      </div>
    </div>
  )
}

type Props = {
  setShowDeleteUserModal: Dispatch<SetStateAction<boolean>>
}

export default DeleteUserModal