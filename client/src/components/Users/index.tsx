import { useQuery } from '@apollo/client';
import { type Dispatch, type SetStateAction } from 'react'

import Alert from '../Icons/Alert';
import Loading from '../Icons/Loading';
import AddUserModal from '../Modals/AddUser'
import { UserTable } from '../Tables/UserTable'
import { GET_USERS } from '../../queries/users';

import './index.scss'

const Users = ({ showAddUserModal, setShowAddUserModal }: Props) => {
  const { loading, error, data } = useQuery(GET_USERS)

  if (loading) return (
    <div className='users-loading' data-test-id='users-loading'>
      <Loading />
      <div className='users-loading-text'>
        Loading Users
      </div>
    </div>
  )

  if (error) return (
    <div className='users-error' data-test-id='users-error'>
      <Alert /> 
      <div className='users-error-text'>
        Error Fetching Users
      </div>
    </div>
  )

  return (
    <div className='users' data-test-id='users'>
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
