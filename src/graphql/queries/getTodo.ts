import { gql } from '@apollo/client';

export const GET_TODO = gql`
  query ($todoId: ID!) {
    todo(id: $todoId) {
      id
      name
      description
      status
      createdAt
      createdBy {
        email
        id
      }
    }
  }
`;
