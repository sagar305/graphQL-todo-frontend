import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Chip, Container } from '@mui/material';
import { ErrorSharp, HomeFilled } from '@mui/icons-material';
import MenuBar from '../../components/MenuBar';
import ErrorComponent from '../../components/Error';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <MenuBar pages={['Home', 'My Todos']} settings={['Logout']} />
      <Container>
        <h2>404 Error</h2>
        <Breadcrumbs>
          <Chip
            icon={<HomeFilled />}
            onClick={() => navigate('/')}
            label="Home"
            sx={{ cursor: 'pointer' }}
            color="primary"
          />
          <Chip
            label="404 Error"
            icon={<ErrorSharp />}
            sx={{ cursor: 'pointer' }}
          />
        </Breadcrumbs>
        <ErrorComponent
          errorHeading="404 Error"
          errorMesage="Page not Found"
          primaryCta="Back to Home"
          primaryFunc={() => navigate('/')}
          secondaryCta="Reload this page"
          secondaryFunc={() => navigate(0)}
        />
      </Container>
    </>
  );
};

export default NotFound;
