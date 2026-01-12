import { useMutation } from '@apollo/client'
import { useRef, type Dispatch, type SetStateAction } from 'react'

import { GET_USERS } from '../../../queries/users'
import type { CourseResult } from '../../../types/user'
import { UPDATE_COURSE_RESULT } from '../../../queries/courseResults'

const UpdateCourseResultForm = ({ result, setShowUserModal, setShowResultModal }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const scoreRef = useRef<HTMLInputElement>(null)
  const [updateCourseResult] = useMutation(UPDATE_COURSE_RESULT, {
    refetchQueries: [GET_USERS]
  })

  return (
    <div>
      <form onSubmit={e => {
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
      }}>
        <input ref={nameRef} placeholder='Course Name' />
        <input ref={scoreRef} placeholder='Course Score' />
        <button type="submit">Update Course Result</button>
      </form>
    </div>
  )
}

type Props = {
  result: CourseResult
  setShowUserModal: Dispatch<SetStateAction<boolean>>
  setShowUpdateCourseResultForm: Dispatch<SetStateAction<boolean>>
}

export default UpdateCourseResultForm
