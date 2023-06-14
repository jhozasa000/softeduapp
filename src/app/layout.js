import './globals.css'
import { Roboto } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css';

const roboto = Roboto({
  weight: ['300'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Software educativo app',
  description: 'Software educativo para la gestión administrativa y los docentes',
}

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={'bg-light '+roboto.className}>{children}</body>
    </html>
    </>
    
  )
}
