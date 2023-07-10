import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UpdateEventContextProvider } from "../context/UpdateEventContext";
import { Session } from "next-auth";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <UpdateEventContextProvider>
          <Component {...pageProps} />
        </UpdateEventContextProvider>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
