import Head from 'next/head';
import type { ReactNode } from 'react';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <Head>
      <title>Andrew Shearer Dev Portfolio</title>
      <meta name='description' content="Andrew Shearer's front end developer portfolio" />
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <Nav />

    <main>{children}</main>

    <Footer />
  </>
);

export default Layout;
