import 'react-toastify/dist/ReactToastify.css';
import ClientNavbar from './ClientNavbar';
import ClientFooter from './ClientFooter';
import { CartProvider } from '@/context/CartContext';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'Farmacia',
  description: 'Farmacia para compra de medicamentos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
      <body
        style={{
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CartProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ClientNavbar />
          <main style={{ flex: 1, width: '100%' }}>{children}</main>
          <ClientFooter />
        </CartProvider>
      </body>
    </html>
  );
}
