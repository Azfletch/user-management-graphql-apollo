import { useMutation } from '@apollo/client'
import { useRef, type Dispatch, type SetStateAction } from 'react'

import Button from '../../Button'
import Input from '../../Input'
import { GET_USERS } from '../../../queries/users'
import { UPDATE_COURSE_RESULT } from '../../../queries/courseResults'
import type { CourseResult } from '../../../types/user'

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
          <Input
            label='Course Name'
            ref={nameRef}
          />
          <Input
            label='Course Score'
            ref={scoreRef}
          />
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
