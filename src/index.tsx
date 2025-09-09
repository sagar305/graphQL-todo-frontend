import React from 'react';
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './styles.scss';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.APIURL,
  }),
  cache: new InMemoryCache(),
});

const container = document.getElementById('root')!;
const root = createRoot(container);
const theme = createTheme({
  palette: {
    primary: {
      main: '#5A3710',
    },
  },
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
