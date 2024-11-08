import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function CartPage() {
  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cart
        </Typography>
      </Box>
    </Container>
  );
}

export default CartPage;