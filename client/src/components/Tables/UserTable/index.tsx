import { useState } from 'react';

import TableSorter from '../Sorter';
import UserTableRows from './Rows';
import { userTableColumns } from '../../../lib/sorting';
import type { User } from '../../../types/user';

import './index.scss';

export const UserTable = ({ users }: Props) => {
  const defaultSortKey = 'lastName';
  const [sortKey, setSortKey] = useState<string>(defaultSortKey)
  const [isReverse, setIsReverse] = useState<boolean>(true)

  return (
    <div className='user-table' data-test-id='user-table'>
      <TableSorter
        isReverse={isReverse}
        setIsReverse={setIsReverse}
        setSortKey={setSortKey}
        sortKey={sortKey}
        tableColumns={userTableColumns}
      />
      <UserTableRows
        users={users}
        sortKey={sortKey}
        isReverse={isReverse}
      />
    </div>
  )
}

type Props = {
  users: User[]
}

export default UserTable
