// The Layout component specifies common features of every page like the header and the footer

import Link from 'next/link';
import { ReactNode } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;