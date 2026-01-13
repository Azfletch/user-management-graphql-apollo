import type { Dispatch, SetStateAction } from 'react'

import Button from '../Button'

import './index.scss'

const Header = ({ setShowAddUserModal }: Props) => {
  return (
    <div className='app-header'>
      <div className='app-header-text'>
        Users
      </div>

      <Button
        className='app-header-button'
        onClick={() => setShowAddUserModal(true)}
      >
        Add User
      </Button>
    </div>
  )
}

type Props = {
  setShowAddUserModal: Dispatch<SetStateAction<boolean>>
}

export default Header
