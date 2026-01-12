import type { Dispatch, SetStateAction } from 'react'

import AddUserForm from '../../Forms/AddUser'
import Close from '../../Icons/Close'

import './index.scss'

const AddUserModal = ({setShowAddUserModal}: Props) => {
  return (
    <div className='add-user-modal'>
      <button
        className='add-user-modal-overlay'
        onClick={() => setShowAddUserModal(false)}
      />

      <div className='add-user-modal-content'>
        <div className='add-user-modal-content-header'>
          <div className='add-user-modal-content-header-title'>
            Add User
          </div>

          <button className='add-user-modal-content-header-button' onClick={() => setShowAddUserModal(false)}>
            <Close />
          </button>
        </div>

        <div className='add-user-modal-content-form'>
          <AddUserForm setShowAddUserModal={setShowAddUserModal} />
        </div>
      </div>
    </div>
  )
}

type Props = {
  setShowAddUserModal: Dispatch<SetStateAction<boolean>>
}

export default AddUserModal
