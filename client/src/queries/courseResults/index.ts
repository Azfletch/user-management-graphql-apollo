import { gql } from "@apollo/client";

export const CREATE_COURSE_RESULT = gql`
  mutation createCourseResult($name: String!, $score: Int!, $learnerId: ID!) {
    createCourseResult(name: $name, score: $score, learnerId: $learnerId) {
      learnerId
      name
      score
    }
  }
`

export const DELETE_COURSE_RESULT = gql`
  mutation deleteCourseResult($learnerId: ID!) {
    deleteCourseResult(learnerId: $learnerId)
  }
`;