import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Terminal } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import CodeBlock from '../components/ui/CodeBlock';

const NotFound: React.FC = () => {
  const errorCode = `// Error 404: Page Not Found
class PageNotFoundError extends Error {
  constructor(path) {
    super(\`Route "\${path}" does not exist\`);
    this.name = 'PageNotFoundError';
    this.statusCode = 404;
    this.timestamp = new Date().toISOString();
  }

  getSuggestions() {
    return [
      'Check the URL for typos',
      'Go back to the home page',
      'Use the navigation menu',
      'Try the terminal commands'
    ];
  }

  getAvailableRoutes() {
    return [
      '/',
      '/about',
      '/projects', 
      '/skills',
      '/contact'
    ];
  }
}

// Current error:
const error = new PageNotFoundError(window.location.pathname);
console.error(error.message);

// Available solutions:
error.getSuggestions().forEach(suggestion => {
  console.log('💡', suggestion);
});`;

  const { displayText } = useTypewriter({
    text: "404: Page not found in terminal directory",
    speed: 50
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8 max-w-4xl min-h-screen flex flex-col justify-center"
    >
      {/* ASCII Art 404 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <pre className="text-terminal-red font-mono text-sm md:text-base mb-4">
{`
    ██╗  ██╗ ██████╗ ██╗  ██╗
    ██║  ██║██╔═████╗██║  ██║
    ███████║██║██╔██║███████║
    ╚════██║████╔╝██║╚════██║
         ██║╚██████╔╝     ██║
         ╚═╝ ╚═════╝      ╚═╝
`}
        </pre>
        <h1 className="text-2xl md:text-3xl font-bold text-terminal-green mb-2">
          {displayText}
          <span className="animate-blink">█</span>
        </h1>
        <p className="text-gray-400">
          The page you're looking for doesn't exist in this terminal session.
        </p>
      </motion.div>

      {/* Error Code Block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <CodeBlock 
          code={errorCode}
          language="javascript"
          animated={true}
          speed={20}
        />
      </motion.div>

      {/* Navigation Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
      >
        {/* Quick Navigation */}
        <div className="bg-gray-900 border border-terminal-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-terminal-yellow mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Quick Navigation
          </h3>
          <div className="space-y-2">
            {[
              { path: '/', label: 'Home', command: 'cd ~' },
              { path: '/about', label: 'About', command: 'cat about.md' },
              { path: '/projects', label: 'Projects', command: 'ls projects/' },
              { path: '/skills', label: 'Skills', command: 'which skills' },
              { path: '/contact', label: 'Contact', command: 'curl contact.json' }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block p-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors group"
              >
                <div className="font-semibold text-terminal-text group-hover:text-terminal-green">
                  {item.label}
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  $ {item.command}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Terminal Commands */}
        <div className="bg-gray-900 border border-terminal-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-terminal-yellow mb-4">
            🎯 Try These Commands
          </h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="bg-gray-800 p-3 rounded">
              <span className="text-terminal-green">$ </span>
              <span className="text-terminal-blue">help</span>
              <div className="text-gray-400 text-xs mt-1">Show all available commands</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <span className="text-terminal-green">$ </span>
              <span className="text-terminal-blue">ls /</span>
              <div className="text-gray-400 text-xs mt-1">List all sections</div>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <span className="text-terminal-green">$ </span>
              <span className="text-terminal-blue">whoami</span>
              <div className="text-gray-400 text-xs mt-1">Go to homepage</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link
          to="/"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-terminal-green text-black font-semibold rounded-lg hover:bg-green-400 transition-colors"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
        
        <button
          onClick={() => window.history.back()}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-terminal-text font-semibold rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
      </motion.div>

      {/* Fun Terminal Output */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-8 bg-gray-900 border border-terminal-border rounded-lg p-4"
      >
        <div className="font-mono text-sm">
          <div className="text-terminal-green">miyakoai@portfolio:~$ find . -name "*.lost" -type f</div>
          <div className="text-gray-400">./you_are_here.lost</div>
          <div className="text-terminal-green">miyakoai@portfolio:~$ </div>
          <span className="animate-blink">█</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;