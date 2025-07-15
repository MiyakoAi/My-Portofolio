import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../../constants/personalInfo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: personalInfo.github, label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: `mailto:${personalInfo.email}`, label: 'Email' }
  ];

  return (
    <footer className="bg-gray-900 border-t border-terminal-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4 md:mb-0">
            <span>© {currentYear} {personalInfo.name}</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>Hatsune Miku</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-terminal-green transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="mt-4 pt-4 border-t border-terminal-border">
          <div className="font-mono text-xs text-gray-500 text-center">
            {personalInfo.name.toLowerCase().replace(' ', '')}@portfolio:~$ echo "Thanks for visiting!"
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;