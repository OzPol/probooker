//  components/Layout.tsx
// Used to wrap other components and provide a consistent layout across pages
// import React from 'react';

import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

// Define the props type for Layout component
interface LayoutProps {
  children: ReactNode; // children object of type ReactNode
}

// Define the Layout component with the specified props type
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
