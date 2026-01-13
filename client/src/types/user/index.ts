import type { CourseResult } from '../courseResult'

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  courseResults: CourseResult[]
}
