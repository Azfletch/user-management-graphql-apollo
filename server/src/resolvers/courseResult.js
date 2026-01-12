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
        learnerId,
        name,
        score
      }
      db.update(({ courseResults }) => courseResults.push(newResult))

      return newResult
    },
    deleteCourseResult: async (parent, { learnerId }, { db }, info) => {
      db.data.courseResults = db.data.courseResults.filter(result => result.learnerId !== learnerId)

      return true
    },
    updateCourseResult: async (parent, { id, firstName, lastName, email }, { db }, info) => {
      // ToDo: Update course
    }
  }
}
