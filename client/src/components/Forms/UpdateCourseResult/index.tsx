import { useMutation } from '@apollo/client'
import { useRef, type Dispatch, type SetStateAction } from 'react'

import { GET_USERS } from '../../../queries/users'
import type { CourseResult } from '../../../types/user'
import { UPDATE_COURSE_RESULT } from '../../../queries/courseResults'
import Button from '../../Button'

import './index.scss'

const UpdateCourseResultForm = ({ result, setShowUserModal, setShowResultModal, setIsInUpdateResultMode }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const scoreRef = useRef<HTMLInputElement>(null)
  const [updateCourseResult] = useMutation(UPDATE_COURSE_RESULT, {
    refetchQueries: [GET_USERS]
  })

  return (
    <div>
      <form
        className='update-result-form' 
        onSubmit={e => {
          e.preventDefault()
          updateCourseResult({
            variables: {
              id: result.id,
              name: nameRef.current?.value || result.name,
              score: Number(scoreRef.current?.value) || result.score,
              learnerId: result.learnerId
            }
          })
          if (nameRef.current) nameRef.current.value = ''
          if (scoreRef.current) scoreRef.current.value = ''
          setShowResultModal(false)
          setShowUserModal(false)
        }}
      >
        <div className='update-result-form-inputs'>
          <input ref={nameRef} placeholder='Course Name' />
          <input ref={scoreRef} placeholder='Course Score' />
        </div>
        <div className='update-result-form-controls'>
          <Button isSecondary onClick={() => setIsInUpdateResultMode(false)}>
            Back
          </Button>
          <Button type='submit'>
            Update Course Result
          </Button>
        </div>
      </form>
    </div>
  )
}

type Props = {
  result: CourseResult
  setShowUserModal: Dispatch<SetStateAction<boolean>>
  setShowResultModal: Dispatch<SetStateAction<boolean>>
  setIsInUpdateResultMode: Dispatch<SetStateAction<boolean>>
}

export default UpdateCourseResultForm
