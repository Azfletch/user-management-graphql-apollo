export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  courseResults: CourseResult[]
}

export type CourseResult = {
  id: string
  name: string
  score: number
  learnerId: string
}
