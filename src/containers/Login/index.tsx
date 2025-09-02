import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_GQL } from '../../graphql/mutations/login';
import MenuBar from '../../components/MenuBar';
import rightImage from '../../assets/images/left-side.svg';
import leftImage from '../../assets/images/right-side.svg';
import {
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
  Input,
  Alert,
} from '@mui/material';
import './styles.scss';
import ToggleBar from '../../components/ToggleBar';
import toggleOptions from '../../constant/loginToggleValue';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type FormValues = {
  email: string;
  password: string;
};

interface RegenerateTokenResponse {
  login: {
    refreshToken: string;
    token: string;
    user: {
      email: string;
    };
  };
}

const Login = () => {
  const [handleLogin, { data, loading, error }] =
    useMutation<RegenerateTokenResponse>(LOGIN_GQL);
  const [selectedToggleValue, setSelectedToggleValue] = React.useState('login');
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (data !== undefined) {
      localStorage.setItem(
        'refreshToken',
        data?.['login']?.['refreshToken'] ?? ''
      );
      localStorage.setItem('accessToken', data?.['login']?.['token'] ?? '');
      navigate('/');
    }
  }, [data]);

  const handleApiCall = async (data: FormValues) => {
    try {
      await handleLogin({ variables: data });
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (data: FormValues) => {
    console.log('Form Submitted:', data);
    handleApiCall(data);
  };

  return (
    <>
      <MenuBar pages={['Login', 'Sign-up']} />
      <div className="container">
        <div className="left-side">
          <img src={leftImage} alt="left-image" width={'100%'} />
        </div>
        <div className="right-side">
          <img src={rightImage} alt="right-image" width={'100%'} />
        </div>
      </div>
      <div className="login-form">
        <h6>Welcome in ToDo Project</h6>
        <h3>Login</h3>
        <ToggleBar
          defaultValue={selectedToggleValue}
          onChangeValue={(value: string) => {
            setSelectedToggleValue(value);
            navigate(`/${value}`);
          }}
          options={toggleOptions}
        />
        {error && (
          <Alert color="error" variant="standard" sx={{ mb: 2, mt: 2 }}>
            {error.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl variant="standard" fullWidth>
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
          <FormControl variant="standard" fullWidth sx={{ mt: 3 }}>
            <InputLabel htmlFor="password-id">Password</InputLabel>
            <Controller
              name="password"
              control={control}
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
                  error={!!errors.password}
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
            {errors.password && (
              <span style={{ color: 'red', fontSize: 12 }}>
                {errors.password.message}
              </span>
            )}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: 24, width: '100%' }}
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
