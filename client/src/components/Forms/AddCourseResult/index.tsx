import { useMutation } from '@apollo/client'
import { useRef, type Dispatch, type SetStateAction } from 'react'

import Button from '../../Button'
import Input from '../../Input'
import { GET_USERS } from '../../../queries/users'
import { CREATE_COURSE_RESULT } from '../../../queries/courseResults'
import type { User } from '../../../types/user'

import './index.scss'

const AddCourseResultForm = ({ user, setShowAddCourseResultModal, setShowUserModal }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const scoreRef = useRef<HTMLInputElement>(null)
  const [createCourseResult] = useMutation(CREATE_COURSE_RESULT, {
    refetchQueries: [GET_USERS]
  })

  return (
    <div>
      <form
        className='update-result-form'
        onSubmit={e => {
          e.preventDefault()
          createCourseResult({
            variables: {
              learnerId: user.id,
              name: nameRef.current?.value || '',
              score: Number(scoreRef.current?.value),
            }
          })
          if (nameRef.current) nameRef.current.value = ''
          if (scoreRef.current) scoreRef.current.value = ''
          setShowAddCourseResultModal(false)
          setShowUserModal(false)
        }}
      >
        <div className='add-result-form-inputs'>
          <Input
            label='Course Name'
            ref={nameRef}
          />
          <Input
            label='Course Score'
            ref={scoreRef}
          />
        </div>
        <div className='add-result-form-controls'>
          <Button
            onClick={() => {
              setShowUserModal(true)
              setShowAddCourseResultModal(false)
            }}
            isSecondary
          >
            Back
          </Button>
          <Button
            type='submit'
          >
            Create Course Result
          </Button>
        </div>
      </form>
    </div>
  )
}

type Props = {
  user: User
  setShowAddCourseResultModal: Dispatch<SetStateAction<boolean>>
  setShowUserModal: Dispatch<SetStateAction<boolean>>
}

export default AddCourseResultForm
