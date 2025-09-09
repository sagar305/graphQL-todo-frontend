import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query {
    todosByMe {
      id
      createdAt
      createdBy {
        email
      }
      description
      name
      status
    }
  }
`;
