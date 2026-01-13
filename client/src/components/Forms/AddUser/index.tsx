import { useMutation } from '@apollo/client'
import { useRef, type Dispatch, type SetStateAction } from 'react'

import Button from '../../Button'
import Input from '../../Input'
import { CREATE_USER, GET_USERS } from '../../../queries/users'

import './index.scss'

const AddUserForm = ({ setShowAddUserModal }: Props) => {
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [GET_USERS]
  })

  return (
    <div>
      <form
        className='add-user-form' 
        onSubmit={e => {
          e.preventDefault()
          createUser({
            variables: {
              firstName: firstNameRef.current?.value || '',
              lastName: lastNameRef.current?.value || '',
              email: emailRef.current?.value || ''
            }
          })
          if (firstNameRef.current) firstNameRef.current.value = ''
          if (lastNameRef.current) lastNameRef.current.value = ''
          if (emailRef.current) emailRef.current.value = ''
          setShowAddUserModal(false)
        }}
      >
        <div className='add-user-form-inputs'>
          <Input
            label='First Name'
            ref={firstNameRef}
          />
          <Input
            label='First Name'
            ref={lastNameRef}
          />
          <Input
            label='Email'
            ref={emailRef}
            type='email'
          />
        </div>
        <div className='add-user-form-controls'>
          <Button type='submit'>Create User</Button>
        </div>
      </form>
    </div>
  )
}

type Props = {
  setShowAddUserModal: Dispatch<SetStateAction<boolean>>
}

export default AddUserForm
