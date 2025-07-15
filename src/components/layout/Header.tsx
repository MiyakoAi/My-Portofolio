import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navigationItems } from '../../constants/navigation';
import { personalInfo } from '../../constants/personalInfo';
import MobileNavigation from '../common/MobileNavigation';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-gray-900 border-b border-terminal-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-terminal-green rounded-sm flex items-center justify-center">
              <span className="text-black font-bold">$</span>
            </div>
            <span className="font-mono font-semibold text-terminal-text">
              {personalInfo.name.split(' ')[0].toLowerCase()}@portfolio
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative px-3 py-2 font-mono text-sm hover:text-terminal-green transition-colors duration-200"
              >
                <span className="text-terminal-blue">$</span> {item.command}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-terminal-green"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
};

export default Header;