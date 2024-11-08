import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

// aqui se puede hacer la pantalla para recuperar la contraseña
// y despyes en esta misma mandar a llamar al otro componente de la segunda pantalla de recuperar contraseña

function ForgotPasswordPage() {
  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Enter your email address to reset your password.
        </Typography>
        <TextField label="Email" variant="outlined" margin="normal" fullWidth />
        <Button variant="contained" color="primary" fullWidth>
          Reset Password
        </Button>
      </Box>
    </Container>
  );
}

export default ForgotPasswordPage;