import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function PaymentSuccess() {
  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Payment Success
        </Typography>
      </Box>
    </Container>
  );
}

export default PaymentSuccess;