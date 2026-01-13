import type { TableColumns } from '../../types/tables'
import type { CourseResult } from '../../types/courseResult'
import type { User } from '../../types/user'

export const courseResultTableColumns: TableColumns = [
  {
    sortKey: 'name',
    title: 'Name'
  },
  {
    sortKey: 'score',
    title: 'Score'
  }
]

export const userTableColumns: TableColumns = [
  {
    sortKey: 'firstName',
    title: 'First Name'
  },
  {
    sortKey: 'lastName',
    title: 'Last Name'
  },
  {
    sortKey: 'email',
    title: 'Email'
  }
]

export const sortUsers = (users: User[], sortKey: string, isReverse: boolean): User[] => {
  const sortedUsers = users.sort((userA: User, userB: User) => {
    const a = userA?.[sortKey as keyof User]
    const b = userB?.[sortKey as keyof User]

    return a == b ? 0 : a > b ? 1 : -1;
  })

  return isReverse ? sortedUsers.reverse() : sortedUsers;
}

export const sortCourseResults = (results: CourseResult[], sortKey: string, isReverse: boolean): CourseResult[] => {
  const sortedResults = results.sort((resultA: CourseResult, resultB: CourseResult) => {
    const a = resultA?.[sortKey as keyof CourseResult]
    const b = resultB?.[sortKey as keyof CourseResult]

    return a == b ? 0 : a > b ? 1 : -1;
  })

  return isReverse ? sortedResults.reverse() : sortedResults;
}
