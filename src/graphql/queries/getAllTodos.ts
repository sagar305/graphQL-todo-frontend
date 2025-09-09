import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query ($page: Int) {
    todos(page: $page) {
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
