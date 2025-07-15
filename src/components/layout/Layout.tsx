import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BackToTop from '../common/BackToTop';
import SEO from '../common/SEO';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text flex flex-col">
      <SEO />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;