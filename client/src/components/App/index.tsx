import { useState } from 'react';

import Header from '../Header'
import Users from '../Users'

import './index.scss'

const App = () => {
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);

  return (
    <div className='app' data-test-id='app'>
      <Header
        setShowAddUserModal={setShowAddUserModal}
      />
      <Users
        showAddUserModal={showAddUserModal}
        setShowAddUserModal={setShowAddUserModal}
      />
    </div>
  )
}

export default App
