import { useState } from 'react';
import Header from '../Header'
import Users from '../Users'

import './index.scss'

const App = () => {
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false);

  return (
    <div className='app'>
      <Header
        setShowAddUserModal={setShowAddUserModal}
      />
      <Users
        showAddUserModal={showAddUserModal}
        showDeleteUserModal={showDeleteUserModal}
        setShowAddUserModal={setShowAddUserModal}
        setShowDeleteUserModal={setShowDeleteUserModal}
      />
    </div>
  )
}

export default App
