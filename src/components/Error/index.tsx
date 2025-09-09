import React from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import Error404 from './../../assets/images/404-image.png';

interface ErrorComponentProps {
  errorHeading: string;
  errorMesage: string;
  primaryCta: string;
  primaryFunc: () => void;
  secondaryCta?: string;
  secondaryFunc?: () => void;
}

const ErrorComponent = ({
  errorHeading,
  errorMesage,
  primaryCta,
  secondaryCta,
  primaryFunc,
  secondaryFunc,
}: ErrorComponentProps) => (
  <Card sx={{ mt: 4 }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <img
        src={Error404}
        alt={'Error Message'}
        width="50%"
        style={{ maxWidth: '300px' }}
      />
      <Typography variant="h2">{errorHeading}</Typography>
      <Typography variant="body1">{errorMesage}</Typography>
      <ButtonGroup
        sx={{
          display: 'flex',
          columnGap: 2,
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={primaryFunc}>
          {primaryCta}
        </Button>
        {secondaryCta && secondaryFunc && (
          <Button variant="outlined" color="primary" onClick={secondaryFunc}>
            {secondaryCta}
          </Button>
        )}
      </ButtonGroup>
    </CardContent>
  </Card>
);

export default ErrorComponent;
