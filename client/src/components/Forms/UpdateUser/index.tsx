import { useMutation } from '@apollo/client'
import { useRef, type Dispatch, type SetStateAction } from 'react'

import { GET_USERS, UPDATE_USER } from '../../../queries/users'
import type { User } from '../../../types/user'

const UpdateUserForm = ({ user, setShowUserModal }: Props) => {
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USERS]
  })

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        updateUser({
          variables: {
            id: user.id,
            firstName: firstNameRef.current?.value || user.firstName,
            lastName: lastNameRef.current?.value || user.lastName,
            email: emailRef.current?.value || user.email
          }
        })
        if (firstNameRef.current) firstNameRef.current.value = ''
        if (lastNameRef.current) lastNameRef.current.value = ''
        if (emailRef.current) emailRef.current.value = ''
        setShowUserModal(false)
      }}>
        <input ref={firstNameRef} placeholder='First Name' />
        <input ref={lastNameRef} placeholder='Last Name' />
        <input ref={emailRef} placeholder='Email' type='email' />
        <button type="submit">Update User</button>
      </form>
    </div>
  )
}

type Props = {
  user: User
  setShowUserModal: Dispatch<SetStateAction<boolean>>
}

export default UpdateUserForm
