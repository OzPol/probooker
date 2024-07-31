// moving from old repo
// The pages/_app.tsx file in a Next.js project is used to customize the default App component,
// which is the top-level component that wraps all the pages in the application. 
// This file is useful for persisting layout between page changes,
// keeping state when navigating pages, and injecting additional data or properties into pages.

// pages/_app.tsx
import '../styles/globals.css';
import { ReactNode, ComponentType } from 'react';
import Layout from '../components/Layout'

interface MyAppProps {
  Component: ComponentType<any>;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  return (
      <Layout>
      <Component {...pageProps} />
      </Layout>
  );
}

export default MyApp;
