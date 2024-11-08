import React from 'react';
import { Container, Typography, Box } from '@mui/material';

// Aqui se debe de hacer la Landing Page de la aplicación

function HomePage() {
  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h3" component="h1" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1" component="p">
          This is the home page
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;