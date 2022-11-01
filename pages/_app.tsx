/* eslint-disable react/jsx-props-no-spreading */

import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Layout from "../components/Layout/Layout";
import GlobalStyle from "../styles/GlobalStyle";
import theme from "../styles/theme";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <Layout>
      <GlobalStyle />
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
);

export default MyApp;
