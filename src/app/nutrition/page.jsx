import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function NutritionPage() {
  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Nutrition Page
        </Typography>
      </Box>
    </Container>
  );
}

export default NutritionPage;