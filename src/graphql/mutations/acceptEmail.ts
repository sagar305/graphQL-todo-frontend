import { gql } from '@apollo/client';

export const SIGNUP_STEP_ONE = gql`
  mutation ($email: String!) {
    signup(email: $email) {
      message
    }
  }
`;
