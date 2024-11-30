import ClientNavbar from './ClientNavbar';
import ClientFooter from './ClientFooter';

export const metadata = {
  title: 'Farmacia',
  description: 'Farmacia para compra de medicamentos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
      <body style={{ width: '100%', height: '100%', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navbar */}
        <ClientNavbar />

        {/* Contenido principal */}
        <main style={{ flex: 1, width: '100%' }}>{children}</main>

        {/* Footer */}
        <ClientFooter />
      </body>
    </html>
  );
}
