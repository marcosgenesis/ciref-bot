import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import './reset.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/styles/theme';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
