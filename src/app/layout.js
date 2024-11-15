"use client";
import './globals.css';
import { Roboto } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Context } from './components/context/themecontext';
import Session from './components/functions/Session';
import styles from './page.module.css';

const roboto = Roboto({
  weight: ['300'],
  style: ['normal'],
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={` ${roboto.className} ${styles.back}`}>
        <Context>
          <Session>{children}</Session>
        </Context>
      </body>
    </html>
  );
}