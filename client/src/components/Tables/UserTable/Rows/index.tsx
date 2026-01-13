import { useEffect, useState } from 'react'

import AddCourseResultModal from '../../../Modals/AddCourseResult';
import ResultModal from '../../../Modals/ResultModal';
import UserModal from '../../../Modals/UserModal';
import UserTableRow from '../Row';
import { sortUsers } from '../../../../lib/sorting';
import type { CourseResult } from '../../../../types/courseResult'
import type { User } from '../../../../types/user';

const UserTableRows = ({ users, sortKey, isReverse }: Props) => {
  const [sortedUsers, setSortedUsers] = useState<User[]>(users);
  const [selectedUser, setSelectedUser] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    courseResults: []
  });
  const [selectedResult, setSelectedResult] = useState<CourseResult>({
    id: '',
    learnerId: '',
    name: '',
    score: 0
  });
  const [showResultModal, setShowResultModal] = useState<boolean>(false)
  const [showUserModal, setShowUserModal] = useState<boolean>(false)
  const [showAddCourseResultModal, setShowAddCourseResultModal] = useState<boolean>(false);

  useEffect(() => {
    setSortedUsers(sortUsers(JSON.parse(JSON.stringify(users)), sortKey, isReverse))
  }, [sortKey, isReverse, users])

  if (users.length === 0) {
    return null
  }

  return (
    <div
      className='user-table-rows'
      data-test-id='user-table-rows'
    >
      {sortedUsers.map((user: User, index) =>
        <UserTableRow
          key={index}
          user={user}
          setSelectedUser={setSelectedUser}
          setShowUserModal={setShowUserModal}
        />
      )}

      {showUserModal && (
        <UserModal
          user={selectedUser}
          setShowAddCourseResultModal={setShowAddCourseResultModal} 
          setShowUserModal={setShowUserModal}
          setSelectedResult={setSelectedResult}
          setShowResultModal={setShowResultModal}
        />
      )}

      {showAddCourseResultModal && (
        <AddCourseResultModal
          user={selectedUser}
          setShowAddCourseResultModal={setShowAddCourseResultModal}
          setShowUserModal={setShowUserModal}
        />
      )}

      {showResultModal && (
        <ResultModal
          result={selectedResult}
          setShowResultModal={setShowResultModal}
          setShowUserModal={setShowUserModal}
        />
      )}
    </div>
  )
}

type Props = {
  users: User[]
  sortKey: string
  isReverse: boolean
}

export default UserTableRows
