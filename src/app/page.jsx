import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import RegisterForm from '../app/register/RegisterForm';
import LoginForm from '../app/login/LoginForm';
import RecoverPassword1 from './forgetPassword/RecoverPassword1';
import RecoverPassword2 from './forgetPassword/RecoverPassword2';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

// Aqui se debe de hacer la Landing Page de la aplicación

function HomePage() {
  return (
    <Box>
      <LoginForm/>
      <RegisterForm/>
      <RecoverPassword1/>
      <RecoverPassword2/>
    </Box>
  );
}

export default HomePage;