import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

//Aqui se puede hacer el login de la aplicación

function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField label="Username" variant="outlined" margin="normal" fullWidth />
        <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth />
        <Button variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;