import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function CheckoutFormPage() {
  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Checkout
        </Typography>
      </Box>
    </Container>
  );
}

export default CheckoutFormPage;