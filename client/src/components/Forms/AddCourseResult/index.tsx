import { useMutation } from '@apollo/client'
import { useRef, type Dispatch, type SetStateAction } from 'react'

import { GET_USERS } from '../../../queries/users'
import { CREATE_COURSE_RESULT } from '../../../queries/courseResults'
import type { User } from '../../../types/user'
import Button from '../../Button'

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
          <input ref={nameRef} placeholder='Course Name' />
          <input ref={scoreRef} placeholder='Score' />
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
