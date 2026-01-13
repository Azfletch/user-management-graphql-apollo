import { useMutation } from '@apollo/client'
import { useRef, type Dispatch, type SetStateAction } from 'react'

import Button from '../../Button'
import Input from '../../Input'
import { GET_USERS, UPDATE_USER } from '../../../queries/users'
import type { User } from '../../../types/user'

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
        data-test-id='update-user-form'
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
          setShowUserModal(false)
        }}
      >
        <div className='update-user-form-inputs' data-test-id='update-user-form-inputs'>
          <Input
            label='First Name'
            ref={firstNameRef}
          />
          <Input
            label='Last Name'
            ref={lastNameRef}
          />
          <Input
            label='Email'
            ref={emailRef}
            type='email'
          />
        </div>
        <div className='update-user-form-controls'>
          <Button
            dataTestId='update-user-form-back-button'
            isSecondary
            onClick={() => setIsInUpdateUserMode(false)}
          >
            Back
          </Button>
          <Button
            dataTestId='update-user-form-submit-button'
            type='submit'
          >
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
