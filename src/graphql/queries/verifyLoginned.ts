import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query ($email: String!) {
    me(email: $email) {
      email
    }
  }
`;
