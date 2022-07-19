import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { CookiesProvider } from 'react-cookie'

function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  return (
      <CookiesProvider>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </CookiesProvider>
  )
}

export default MyApp
