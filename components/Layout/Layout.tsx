import type { ReactNode } from 'react';

// components
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import NextHead from '../NextHead/NextHead';

// props type
type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <NextHead description='Next.js Contentful Blog by Andrew Shearer' />

    <Nav />

    <main>{children}</main>

    <Footer />
  </>
);

export default Layout;
