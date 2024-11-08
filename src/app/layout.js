export const metadata = {
  title: 'Farmacia',
  description: 'Farmacia para compra de medicamentos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
