import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation ($name: String!, $description: String!) {
    createTodo(name: $name, description: $description) {
      name
      description
      status
      createdBy {
        email
        id
      }
      createdAt
    }
  }
`;
