// The Layout component specifies common features of every page like the header and the footer

import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header className="flex justify-between items-center bg-blue-500 p-4">
        <h1 className="text-xl font-bold text-white">ProBooker</h1>
        <nav className="flex space-x-4">
          <Link href="/" legacyBehavior>
            <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Home</a>
          </Link>
          <Link href="/services" legacyBehavior>
            <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">View Services</a>
          </Link>
          <Link href="/providerlogin" legacyBehavior>
            <a className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100">Service Provider Log In</a>
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
