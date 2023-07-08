import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
