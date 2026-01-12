import { useQuery } from '@apollo/client';
import { type Dispatch, type SetStateAction } from 'react'

import AddUserModal from '../Modals/AddUser'
import { UserTable } from '../Tables/UserTable'
import { GET_USERS } from '../../queries/users';

import './index.scss'

const Users = ({ showAddUserModal, setShowAddUserModal }: Props) => {
  const { loading, error, data } = useQuery(GET_USERS)


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <div className='users'>
      <UserTable users={data.users} />

      {showAddUserModal && (
        <AddUserModal setShowAddUserModal={setShowAddUserModal} />
      )}
    </div>
  )
}

type Props = {
  showAddUserModal: boolean
  setShowAddUserModal: Dispatch<SetStateAction<boolean>>
}

export default Users
