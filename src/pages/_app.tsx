import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import './reset.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/styles/theme';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
