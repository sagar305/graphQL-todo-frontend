import { gql } from '@apollo/client';

export const SIGNUP_STEP_TWO = gql`
  mutation ($email: String!, $otp: String!, $password: String!) {
    verifyOtp(email: $email, otp: $otp, password: $password) {
      message
    }
  }
`;
