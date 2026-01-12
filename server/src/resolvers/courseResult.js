import { randomUUID } from 'crypto'

export default {
  CourseResult: {
    name: async (parent, args, context, info) => parent.name,
    score: async (parent, args, context, info) => parent.score,
    learnerId:  async (parent, args, context, info) => parent.learnerId
  },
  Query: {
    courseResults: async (parent, args, { db }, info) => {
      return db.get('courseResults').value()
    },
    courseResult: async (parent, { id }, { db }, info) => {
      return db.chain.get('courseResults').getById(id).value()
    }
  },
  Mutation: {
    createCourseResult: async (parent, { name, score, learnerId }, { db }, info) => {
      const newResult = {
        id: randomUUID(),
        learnerId,
        name,
        score
      }
      db.update(({ courseResults }) => courseResults.push(newResult))

      return newResult
    },
    deleteCourseResult: async (parent, { id }, { db }, info) => {
      db.data.courseResults = db.data.courseResults.filter(result => result.id !== id)

      return true
    },
    updateCourseResult: async (parent, { id, name, score }, { db }, info) => {
      db.data.courseResults = db.data.courseResults.map(result => {
        if (result.id === id) {
          return {
            ...result,
            name,
            score,
          }
        }

        return result
      })

      return db.data.courseResults.find(result => result.id === id)
    }
  }
}
