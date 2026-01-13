import { sortCourseResults, sortUsers } from './'
import type { CourseResult } from '../../types/courseResult'
import type { User } from '../../types/user'

describe('sortUsers()', () => {
  test('sorts users', () => {
    const users: User[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        id: '123',
        courseResults: []
      },
      {
        firstName: 'Mike',
        lastName: 'Smith',
        email: 'mike@example.com',
        id: '456',
        courseResults: []
      },
      {
        firstName: 'Arron',
        lastName: 'Fletcher',
        email: 'arron@example.com',
        id: '789',
        courseResults: []
      }
    ]

    const sortedUsers = sortUsers(users, 'firstName', false)

    expect(sortedUsers[0].firstName).toBe('Arron')
    expect(sortedUsers[1].firstName).toBe('John')
    expect(sortedUsers[2].firstName).toBe('Mike')
  })

  test('sorts users (reverse)', () => {
    const users: User[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        id: '123',
        courseResults: []
      },
      {
        firstName: 'Mike',
        lastName: 'Smith',
        email: 'mike@example.com',
        id: '456',
        courseResults: []
      },
      {
        firstName: 'Arron',
        lastName: 'Fletcher',
        email: 'arron@example.com',
        id: '789',
        courseResults: []
      }
    ]

    const sortedUsers = sortUsers(users, 'firstName', true)

    expect(sortedUsers[0].firstName).toBe('Mike')
    expect(sortedUsers[1].firstName).toBe('John')
    expect(sortedUsers[2].firstName).toBe('Arron')
  })
})

describe('sortResults()', () => {
  test('sorts results', () => {
    const results: CourseResult[] = [
      {
        name: 'Test Result',
        score: 15,
        learnerId: '123',
        id: '456'
      },
      {
        name: 'Another Result',
        score: 90,
        learnerId: '123',
        id: '123'
      },
      {
        name: 'Big Result',
        score: 100,
        learnerId: '123',
        id: '789'
      }
    ]

    const sortedResults = sortCourseResults(results, 'score', false)

    expect(sortedResults[0].score).toBe(15)
    expect(sortedResults[1].score).toBe(90)
    expect(sortedResults[2].score).toBe(100)
  })

  test('sorts results (reverse)', () => {
    const results: CourseResult[] = [
      {
        name: 'Test Result',
        score: 15,
        learnerId: '123',
        id: '456'
      },
      {
        name: 'Another Result',
        score: 90,
        learnerId: '123',
        id: '123'
      },
      {
        name: 'Big Result',
        score: 100,
        learnerId: '123',
        id: '789'
      }
    ]

    const sortedResults = sortCourseResults(results, 'score', true)

    expect(sortedResults[0].score).toBe(100)
    expect(sortedResults[1].score).toBe(90)
    expect(sortedResults[2].score).toBe(15)
  })
})
