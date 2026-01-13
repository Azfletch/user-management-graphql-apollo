import { type Dispatch, type SetStateAction } from 'react'

import type { User } from '../../../../types/user'
import { userTableColumns } from '../../../../lib/sorting'

import './index.scss'

const UserTableRow = ({ user, setShowUserModal, setSelectedUser }: Props) => {
  const handleRowClick = () => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  return (
    <div
      className='user-table-row'
      data-test-id='user-table-row'
      onClick={handleRowClick}
    >
      {userTableColumns.map((column, index) => {
        const value = user[column.sortKey as keyof User]

        if (typeof value === 'string') {
          return (
            <div
              className='user-table-row-cell'
              data-test-id='user-table-row-cell'
              key={index}
            >
              {value}
            </div>
          )
        } else {
          return (
            null
          )
        }
      })}
    </div>
  )
}

type Props = {
  user: User
  setShowUserModal: Dispatch<SetStateAction<boolean>>
  setSelectedUser: Dispatch<SetStateAction<User>>
}

export default UserTableRow
