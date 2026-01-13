import { useMutation } from '@apollo/client'
import { useRef, type Dispatch, type SetStateAction } from 'react'

import Button from '../../Button'
import { CREATE_USER, GET_USERS } from '../../../queries/users'

const AddUserForm = ({ setShowAddUserModal }: Props) => {
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [GET_USERS]
  })

  return (
    <div>
      <form onSubmit={e => {
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
      }}>
        <input ref={firstNameRef} placeholder='First Name' />
        <input ref={lastNameRef} placeholder='Last Name' />
        <input ref={emailRef} placeholder='Email' type='email' />
        <Button type='submit'>Create User</Button>
      </form>
    </div>
  )
}

type Props = {
  setShowAddUserModal: Dispatch<SetStateAction<boolean>>
}

export default AddUserForm
