import { gql } from '@apollo/client';

export const GET_USERS = gql`
  {
    users {
      id
      email
      firstName
      lastName
      courseResults {
        learnerId
        name
        score
        id
      }
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($firstName: String!, $lastName: String!, $email: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $firstName: String, $lastName: String, $email: String) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
