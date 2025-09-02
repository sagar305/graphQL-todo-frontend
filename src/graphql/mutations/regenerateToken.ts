import { gql } from '@apollo/client';

export const REFRESH_TOKEN_GQL = gql`
  mutation ($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      refreshToken
      token
      email: user {
        email
      }
    }
  }
`;
