import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, Copy, Check, Instagram } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import CodeBlock from '../components/ui/CodeBlock';
import { personalInfo } from '../constants/personalInfo';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactCode = `// Contact Information - Always Open for Opportunities
const contactInfo = {
  developer: "MiyakoAi",
  email: "${personalInfo.email}",
  location: "${personalInfo.location}",
  timezone: "UTC+7",
  
  preferredContact: "email", // Primary communication method
  responseTime: "24-48 hours", // Typical response time
  
  socialLinks: {
    github: "${personalInfo.github}",
    linkedin: "${personalInfo.linkedin}",
    portfolio: "https://miyakoai.dev"
  },
  
  availability: {
    freelance: true,
    fullTime: "open to discuss",
    collaboration: true,
    mentoring: true
  },
  
  interests: [
    "Backend API development",
    "System architecture design",
    "Open source contributions",
    "Technical writing",
    "Knowledge sharing"
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

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
          Let's connect and build something amazing together
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          {/* Code Block */}
          <CodeBlock 
            code={contactCode}
            language="javascript"
            animated={true}
            speed={25}
          />

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
                transition={{ delay: index * 0.1 + 0.5 }}
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
                <span className="text-terminal-green">Available</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Full-time Opportunities:</span>
                <span className="text-terminal-yellow">Open to Discuss</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Response Time:</span>
                <span className="text-terminal-blue">24-48 hours</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 border border-terminal-border rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold text-terminal-yellow mb-6">
            Send a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-terminal-text mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-terminal-border rounded font-mono text-terminal-text placeholder-gray-400 focus:border-terminal-green focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-terminal-text mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-terminal-border rounded font-mono text-terminal-text placeholder-gray-400 focus:border-terminal-green focus:outline-none"
                  placeholder="xxxxxx@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-text mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-terminal-border rounded font-mono text-terminal-text placeholder-gray-400 focus:border-terminal-green focus:outline-none"
                placeholder="Project collaboration, job opportunity, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-terminal-text mb-2">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-3 py-2 bg-gray-800 border border-terminal-border rounded font-mono text-terminal-text placeholder-gray-400 focus:border-terminal-green focus:outline-none resize-none"
                placeholder="Tell me about your project, ideas, or how we can work together..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-4 rounded font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : submitStatus === 'success'
                  ? 'bg-terminal-green text-black'
                  : submitStatus === 'error'
                  ? 'bg-terminal-red text-white'
                  : 'bg-terminal-blue text-black hover:bg-blue-400'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <Check className="w-4 h-4" />
                  Message Sent!
                </>
              ) : submitStatus === 'error' ? (
                'Error - Please try again'
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>

          {/* Terminal Output */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-gray-800 border border-terminal-green rounded font-mono text-sm"
            >
              <div className="text-terminal-green">
                $ message.send() <span className="animate-blink">█</span>
              </div>
              <div className="text-gray-300">
                Message sent successfully! ✅<br />
                Response expected within 24-48 hours.
              </div>
            </motion.div>
          )}
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
    </motion.div>
  );
};

export default Contact;