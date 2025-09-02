import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';
import { REFRESH_TOKEN_GQL } from '../graphql/mutations/regenerateToken';
import routes from '../routes';

interface RegenerateTokenResponse {
  refreshToken:
    | {
        refreshToken: string | undefined;
        token: string | undefined;
        user: {
          email: string;
        };
      }
    | undefined
    | null;
}

const App: React.FC = () => {
  const [handleToken, { data, loading, error }] =
    useMutation<RegenerateTokenResponse>(REFRESH_TOKEN_GQL);
  const location = useLocation();
  const navigate = useNavigate();

  const handleApiCall = async () => {
    try {
      await handleToken({
        variables: {
          refreshToken: localStorage.getItem('refreshToken'),
        },
      });
    } catch (error) {
      console.log(error);
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  };

  React.useEffect(() => {
    if (
      data?.['refreshToken'] !== null &&
      data?.['refreshToken'] !== undefined
    ) {
      localStorage.setItem(
        'refreshToken',
        data?.['refreshToken']?.['refreshToken'] ?? ''
      );
      localStorage.setItem(
        'accessToken',
        data?.['refreshToken']?.['token'] ?? ''
      );
      if (location.pathname === '/login' || location.pathname === '/signup') {
        navigate(`/`);
      }
    }
  }, [data]);

  React.useEffect(() => {
    if (
      localStorage.getItem('refreshToken') !== null ||
      localStorage.getItem('refreshToken') !== '' ||
      localStorage.getItem('refreshToken') !== undefined
    ) {
      handleApiCall();
    }
    if (
      (localStorage.getItem('refreshToken') === null ||
        localStorage.getItem('refreshToken') === '' ||
        localStorage.getItem('refreshToken') === undefined) &&
      location.pathname !== '/login' &&
      location.pathname !== '/signup'
    ) {
      navigate(`/login`);
    }
  }, []);

  return (
    <Routes>
      {routes.map((route, idx) => (
        <Route key={idx} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default App;
