import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navigationItems } from '../../constants/navigation';
import { personalInfo } from '../../constants/personalInfo';

const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    console.log('Mobile menu toggle clicked, current state:', isOpen);
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    console.log('Mobile menu closing');
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="p-2 text-terminal-text hover:text-terminal-green transition-colors relative z-10"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
              onClick={closeMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 bg-gray-900 border-l border-terminal-border z-[70] overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="p-4 border-b border-terminal-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-terminal-green">
                    Navigation
                  </h2>
                  <button
                    onClick={closeMenu}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="p-4 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={closeMenu}
                      className={`block p-3 rounded-lg transition-colors ${
                        location.pathname === item.path
                          ? 'bg-terminal-green text-black'
                          : 'text-terminal-text hover:bg-gray-800'
                      }`}
                    >
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm opacity-70 font-mono">
                        $ {item.command}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-terminal-border mt-auto">
                <div className="text-sm text-gray-400 text-center">
                  &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavigation;