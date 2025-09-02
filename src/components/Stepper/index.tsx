import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const steps = ['Enter Email', 'Verify Email & Set Password'];

type StepOne = {
  email: string;
};

type StepTwo = {
  otp: number | '';
  password: string;
  confirmPwd: string;
};

export default function HorizontalLinearStepper() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StepOne>({
    defaultValues: {
      email: '',
    },
  });

  const {
    handleSubmit: handleCreateAccount,
    control: controlCreateAccount,
    formState: { errors: errorsCreateAccount },
  } = useForm<StepTwo>({
    defaultValues: {
      otp: '',
      password: '',
      confirmPwd: '',
    },
  });

  const onSubmit = (data: StepOne) => {
    console.log('Form Submitted:', data);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // Add login logic here (API call, etc.)
  };

  const onCreateAccount = (data: StepTwo) => {
    console.log('Form Submitted:', data);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // Add login logic here (API call, etc.)
  };

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel />
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Alert color="success" variant="standard">
              Account Created Successfully! Please Login
            </Alert>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={() => navigate('/login')}>Login</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 ? (
            <form key="step1" onSubmit={handleSubmit(onSubmit)}>
              <FormControl variant="standard" fullWidth sx={{ mt: 4 }}>
                <InputLabel htmlFor="email-id">Email</InputLabel>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email-id"
                      type="text"
                      error={!!errors.email}
                    />
                  )}
                />
                {errors.email && (
                  <span style={{ color: 'red', fontSize: 12 }}>
                    {errors.email.message}
                  </span>
                )}
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: 24, width: '100%' }}
              >
                Verify Email
              </Button>
            </form>
          ) : (
            <form key="step2" onSubmit={handleCreateAccount(onCreateAccount)}>
              <FormControl variant="standard" fullWidth sx={{ mt: 4 }}>
                <InputLabel htmlFor="otp-id">Enter OTP</InputLabel>
                <Controller
                  name="otp"
                  control={controlCreateAccount}
                  rules={{
                    required: 'OTP is required',
                    pattern: {
                      value: /^\d{6}$/,
                      message: 'OTP must be number only',
                    },
                    maxLength: {
                      value: 6,
                      message: 'Enter a valid OTP of length 6',
                    },
                    minLength: {
                      value: 6,
                      message: 'Enter a valid OTP of length 6',
                    },
                  }}
                  render={({ field }) => {
                    console.log(field);
                    return (
                      <Input
                        {...field}
                        id="otp-id"
                        type="text"
                        error={!!errorsCreateAccount.otp}
                      />
                    );
                  }}
                />
                {errorsCreateAccount.otp && (
                  <span style={{ color: 'red', fontSize: 12 }}>
                    {errorsCreateAccount.otp.message}
                  </span>
                )}
              </FormControl>
              <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
                <InputLabel htmlFor="password-id">Password</InputLabel>
                <Controller
                  name="password"
                  control={controlCreateAccount}
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password-id"
                      type={showPassword ? 'text' : 'password'}
                      error={!!errorsCreateAccount.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword
                                ? 'hide the password'
                                : 'display the password'
                            }
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errorsCreateAccount.password && (
                  <span style={{ color: 'red', fontSize: 12 }}>
                    {errorsCreateAccount.password.message}
                  </span>
                )}
              </FormControl>
              <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
                <InputLabel htmlFor="password-id">Password</InputLabel>
                <Controller
                  name="confirmPwd"
                  control={controlCreateAccount}
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 8 characters',
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password-id"
                      type={'password'}
                      error={!!errorsCreateAccount.confirmPwd}
                    />
                  )}
                />
                {errorsCreateAccount.confirmPwd && (
                  <span style={{ color: 'red', fontSize: 12 }}>
                    {errorsCreateAccount.confirmPwd.message}
                  </span>
                )}
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: 24, width: '100%' }}
              >
                Create Account
              </Button>
            </form>
          )}
        </React.Fragment>
      )}
    </Box>
  );
}
