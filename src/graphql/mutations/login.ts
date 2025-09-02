import { gql } from '@apollo/client';

export const LOGIN_GQL = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
      }
      refreshToken
      token
    }
  }
`;
