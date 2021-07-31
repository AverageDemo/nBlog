import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
  const { session } = pageProps;

  return (
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
