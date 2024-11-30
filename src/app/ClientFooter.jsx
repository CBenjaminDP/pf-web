'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from '../components/footer/Footer';  // Importa el Footer tradicional

const ClientFooter = () => {
  const pathname = usePathname();

  // Rutas donde no se muestra el Footer
  const noFooterRoutes = ['/login', '/register'];
  const showFooter = !noFooterRoutes.includes(pathname);

  return showFooter ? <Footer /> : null;  // Solo se muestra el Footer si no estamos en login o register
};

export default ClientFooter;
