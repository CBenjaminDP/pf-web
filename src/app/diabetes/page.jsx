import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function DiabetesPage() {
  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Diabetes
        </Typography>
      </Box>
    </Container>
  );
}

export default DiabetesPage;