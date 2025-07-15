import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { TerminalProvider } from './context/TerminalContext';
import Layout from './components/layout/Layout';
import { Home, About, Projects, Skills, Certificates, Contact, NotFound } from './pages';
import './styles/globals.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <TerminalProvider>
          <Router>
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
        </TerminalProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;