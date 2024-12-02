'use client';

import Navbar from '../components/navbar/Navbar';
import { usePathname } from 'next/navigation';

export default function ClientNavbar() {
  const pathname = usePathname();

  // Rutas donde no se muestra el Navbar
  const noNavbarRoutes = ['/login', '/register'];
  const showNavbar = !noNavbarRoutes.includes(pathname);

  return showNavbar ? <Navbar /> : null;
}
