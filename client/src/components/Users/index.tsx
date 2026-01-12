import { useQuery } from '@apollo/client';
import { type Dispatch, type SetStateAction } from 'react'

import AddUserModal from '../Modals/AddUser'
import DeleteUserModal from '../Modals/DeleteUser'
import { UserTable } from '../Tables/UserTable'
import { GET_USERS } from '../../queries/users';

import './index.scss'

const Users = ({ showAddUserModal, showDeleteUserModal, setShowAddUserModal, setShowDeleteUserModal }: Props) => {
  const { loading, error, data } = useQuery(GET_USERS)


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <div className='users'>
      <UserTable users={data.users} />

      {showAddUserModal && (
        <AddUserModal setShowAddUserModal={setShowAddUserModal} />
      )}

      {showDeleteUserModal && (
        <DeleteUserModal setShowDeleteUserModal={setShowDeleteUserModal} />
      )}
    </div>
  )
}

type Props = {
  showAddUserModal: boolean
  showDeleteUserModal: boolean
  setShowAddUserModal: Dispatch<SetStateAction<boolean>>
  setShowDeleteUserModal: Dispatch<SetStateAction<boolean>>
}

export default Users
