import { gql } from '@apollo/client';

export const EDIT_TODO = gql`
  mutation (
    $updateTodoId: ID!
    $name: String
    $description: String
    $status: String
  ) {
    updateTodo(
      id: $updateTodoId
      name: $name
      description: $description
      status: $status
    ) {
      id
    }
  }
`;
