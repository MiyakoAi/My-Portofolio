import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { TerminalProvider } from './context/TerminalContext';
import { PageVisitProvider } from './context/PageVisitContext';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './styles/globals.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <TerminalProvider>
          <PageVisitProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="skills" element={<Skills />} />
                  <Route path="certificates" element={<Certificates />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Router>
          </PageVisitProvider>
        </TerminalProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;