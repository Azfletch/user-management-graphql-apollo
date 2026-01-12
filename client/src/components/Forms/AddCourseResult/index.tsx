import { useMutation } from '@apollo/client'
import { useRef, type Dispatch, type SetStateAction } from 'react'
import { GET_USERS } from '../../../queries/users'
import { CREATE_COURSE_RESULT } from '../../../queries/courseResults'
import type { User } from '../../../types/user'

const AddCourseResultForm = ({ user, setShowAddCourseResultForm, setShowUserModal }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const scoreRef = useRef<HTMLInputElement>(null)
  const [createCourseResult] = useMutation(CREATE_COURSE_RESULT, {
    refetchQueries: [GET_USERS]
  })

  return (
    <div>
      <form onSubmit={e => {
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
        setShowAddCourseResultForm(false)
        setShowUserModal(false)
      }}>
        <input ref={nameRef} placeholder='Course Name' />
        <input ref={scoreRef} placeholder='Score' />
        <button type="submit">Create Course Result</button>
      </form>
    </div>
  )
}

type Props = {
  user: User
  setShowAddCourseResultForm: Dispatch<SetStateAction<boolean>>
  setShowUserModal: Dispatch<SetStateAction<boolean>>
}

export default AddCourseResultForm
