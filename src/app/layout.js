export const metadata = {
  title: 'Farmacia',
  description: 'Farmacia para compra de medicamentos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
      <body style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
        <div style={{ width: '100%', height: '100%' }}>{children}</div>
      </body>
    </html>
  );
}