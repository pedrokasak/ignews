import { AppProps } from 'next/app';
import { SessionProvider   as NextAuthProvider } from 'next-auth/react';
import { Header } from '../components/Header/index';
import '../../styles/globals.scss';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
