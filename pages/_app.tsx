import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { store } from '../store';
// import { Provider as ReduxProvider } from 'react-redux'
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Wanderlust</title>
        <link rel="icon" href="/assets/favicon.ico" />
        <link
          rel="shortcut icon"
          href="/assets/favicon.ico"
          type="image/x-icon"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
