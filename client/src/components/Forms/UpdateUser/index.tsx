import { useMutation } from '@apollo/client'
import { useRef, type Dispatch, type SetStateAction } from 'react'

import { GET_USERS, UPDATE_USER } from '../../../queries/users'
import type { User } from '../../../types/user'
import Button from '../../Button'

import './index.scss'

const UpdateUserForm = ({ user, setShowUserModal, setIsInUpdateUserMode }: Props) => {
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [GET_USERS]
  })

  return (
    <div>
      <form
        className='update-user-form'
        onSubmit={e => {
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
        }}
      >
        <div className='update-user-form-inputs'>
          <input ref={firstNameRef} placeholder='First Name' />
          <input ref={lastNameRef} placeholder='Last Name' />
          <input ref={emailRef} placeholder='Email' type='email' />
        </div>
        <div className='update-user-form-controls'>
          <Button onClick={() => setIsInUpdateUserMode(false)} isSecondary>
            Back
          </Button>
          <Button type='submit'>
            Update User
          </Button>
        </div>
      </form>
    </div>
  )
}

type Props = {
  user: User
  setShowUserModal: Dispatch<SetStateAction<boolean>>
  setIsInUpdateUserMode: Dispatch<SetStateAction<boolean>>
}

export default UpdateUserForm
