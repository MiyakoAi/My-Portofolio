import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, Copy, Check, Instagram } from 'lucide-react';
import { usePageVisit } from '../context/PageVisitContext';
import CodeBlock from '../components/ui/CodeBlock';
import { personalInfo } from '../constants/personalInfo';

const Contact: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { isPageVisited, markPageAsVisited } = usePageVisit();
  
  const isContactVisited = isPageVisited('contact');
  
  useEffect(() => {
    if (!isContactVisited) {
      // Give time for CodeBlock animations to start and complete
      const timer = setTimeout(() => {
        markPageAsVisited('contact');
      }, 5000); // Increased to 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isContactVisited, markPageAsVisited]);

  const contactCode = `// Contact Information
const contactInfo = {
  name: "Mugni Adji",
  email: "${personalInfo.email}",
  location: "${personalInfo.location}",
  timezone: "UTC+8",
  
  preferredContact: "email", // Primary communication method
  responseTime: "24-48 hours", // Typical response time
  
  socialLinks: {
    github: "${personalInfo.github}",
    linkedin: "${personalInfo.linkedin}",
  },
  
  availability: {
    freelance: false,
    fullTime: "false",
    collaboration: false,
    mentoring: false
  },
  
  interests: [
    "Backend API development",
    "System architecture design",
  ]
};

// Send message function
function sendMessage(message) {
  return fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
}

// Let's connect!
console.log("Ready to collaborate");`;

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      copyable: true
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      value: '@MiyakoAi',
      href: personalInfo.github,
      copyable: false
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      value: 'Connect with me',
      href: personalInfo.linkedin,
      copyable: false
    },
    {
      icon : <Instagram className="w-6 h-6" />,
      label: 'Instagram',
      value: '@mugniadji',
      href: personalInfo.Instagram,
      copyable: false
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: personalInfo.location,
      href: null,
      copyable: true
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8 max-w-6xl"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-2">
          $ curl contact.json
        </h1>
        <p className="text-terminal-text opacity-80">
          Just Contact me if you want to connect and build something
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Contact Information & Availability */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-terminal-yellow">
              Get in Touch
            </h3>
            
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-gray-900 border border-terminal-border rounded-lg p-4 hover:border-terminal-green transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-terminal-blue">
                      {method.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-terminal-text">
                        {method.label}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {method.value}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {method.copyable && (
                      <button
                        onClick={() => copyToClipboard(method.value, method.label)}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedField === method.label ? (
                          <Check className="w-4 h-4 text-terminal-green" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    )}
                    
                    {method.href && (
                      <a
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="p-2 bg-terminal-green text-black hover:bg-green-400 rounded transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Availability Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-900 border border-terminal-border rounded-lg p-4"
          >
            <h4 className="text-terminal-yellow font-semibold mb-3">
              Current Availability
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Freelance Projects:</span>
                <span className="text-terminal-red">Not Available</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Full-time Opportunities:</span>
                <span className="text-terminal-red">Not Available</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Response Time:</span>
                <span className="text-terminal-blue">24-48 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Preferred Communication */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gray-900 border border-terminal-border rounded-lg p-4"
          >
            <h4 className="text-terminal-yellow font-semibold mb-3">
              Preferred Communication
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-terminal-blue" />
                <span className="text-gray-300">Email is the best way to reach me</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-terminal-blue" />
                <span className="text-gray-300">Check out my latest projects on GitHub</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-terminal-blue" />
                <span className="text-gray-300">Connect with me professionally</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Contact Code Block */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-terminal-yellow mb-4">
              Contact Information API
            </h3>
            <CodeBlock 
              code={contactCode}
              language="javascript"
              animated={!isContactVisited}
              speed={25}
            />
          </div>
        </motion.div>
      </div>

      {/* Fun Terminal Commands */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 bg-gray-900 border border-terminal-border rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-terminal-yellow mb-4">
          Fun Terminal Commands (Try in the home terminal!)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
          <div>
            <span className="text-terminal-green">$ whoami</span>
            <div className="text-gray-400 ml-4">Display developer info</div>
          </div>
          <div>
            <span className="text-terminal-green">$ github</span>
            <div className="text-gray-400 ml-4">Open GitHub profile</div>
          </div>
          <div>
            <span className="text-terminal-green">$ help</span>
            <div className="text-gray-400 ml-4">Show all available commands</div>
          </div>
          <div>
            <span className="text-terminal-green">$ clear</span>
            <div className="text-gray-400 ml-4">Clear terminal history</div>
          </div>
        </div>
      </motion.div>

      {/* Reset Button */}
    </motion.div>
  );
};

export default Contact;