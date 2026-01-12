import type { Dispatch, SetStateAction } from 'react'

import './index.scss'

const Header = ({ setShowAddUserModal }: Props) => {
  return (
    <div className='app-header'>
      <div className='app-header-text'>
        Users
      </div>

      <button
        className='app-header-button'
        onClick={() => setShowAddUserModal(true)}
      >
        Add User
      </button>
    </div>
  )
}

type Props = {
  setShowAddUserModal: Dispatch<SetStateAction<boolean>>
}

export default Header
