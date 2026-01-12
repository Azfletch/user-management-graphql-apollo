import { randomUUID } from 'crypto'

export default {
  User: {
    firstName: async (parent, args, context, info) => parent.firstName,
    lastName: async (parent, args, context, info) => parent.lastName,
    email: async (parent, args, context, info) => parent.email,
    courseResults: async (parent, args, { db }, info) => {
      return db.chain.get('courseResults').filter({ learnerId: parent.id }).value()
    }
  },
  Query: {
    users: async (parent, args, { db }, info) => {
      return db.chain.get('users').value()
    },
    user: async (parent, { id }, { db }, info) => {
      return db.chain.get('users').getById(id).value()
    }
  },
  Mutation: {
    createUser: async (parent, { firstName, lastName, email }, { db }, info) => {
      const newUser = {
        id: randomUUID(),
        firstName,
        lastName,
        email
      }
      db.update(({ users }) => users.push(newUser))

      return newUser
    },
    deleteUser: async (_, { id }, { db }) => {
      db.data.users = db.data.users.filter(user => user.id !== id)
      await db.write()

      return true
    },
    updateUser: async (_, { id, firstName, lastName, email }, { db }, info) => {
      db.data.users = db.data.users.map(user => {
        if (user.id === id) {
          return {
            ...user,
            id,
            firstName,
            lastName,
            email
          }
        }

        return user
      })

      return db.data.users.find(user => user.id === id)
    }
  }
}
