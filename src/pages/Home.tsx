import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useTypewriter';
import Terminal from '../components/ui/Terminal';
import CodeBlock from '../components/ui/CodeBlock';
import SEO from '../components/common/SEO';
import { personalInfo } from '../constants/personalInfo';

const Home: React.FC = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [startSubtitle, setStartSubtitle] = useState(false);
  
  const welcomeText = `Hello Sekai, I'm ${personalInfo.name}`;
  const subtitleText = `Lazy Programmer and Skroll Enjiner`/*personalInfo.title*/;

  const { displayText: welcomeDisplay, isComplete: welcomeComplete } = useTypewriter({
    text: welcomeText,
    speed: 50,
    onComplete: () => {
      setTimeout(() => setStartSubtitle(true), 500);
      setTimeout(() => setShowTerminal(true), 1000);
    }
  });

  const { displayText: subtitleDisplay, isComplete: subtitleComplete } = useTypewriter({
    text: startSubtitle ? subtitleText : '',
    speed: 50,
    delay: 0
  });

  const codeExample = `// Welcome to my portfolio
const developer = {
  name: "${personalInfo.name}",
  role: "${personalInfo.title}",
  location: "${personalInfo.location}",
  passions: ["Skroll enjiner", "Lazy Programmer", "Ai Promtting"],
  
  getIntroduction() {
    return \`Hi! I'm a ${personalInfo.title} who loves building 
    robust backend systems and with Ai :v.\`;
  }
};

console.log(developer.getIntroduction());`;

  return (
    <>
      <SEO 
        title="Home"
        description="Portfolio Backend Developer - Full Stack Web Developer dengan keahlian dalam Node.js, React, dan teknologi modern lainnya"
        keywords="backend developer, full stack developer, portfolio, web developer, node.js, react, javascript"
        image="https://my-portofolio-da5i.vercel.app/og-image.png"
      />
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full space-y-8"
      >
        {/* Main Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="text-terminal-green">{welcomeDisplay}</span>
            {!welcomeComplete && <span className="animate-blink">█</span>}
          </h1>
          
          {startSubtitle && (
            <h2 className="text-xl md:text-2xl text-terminal-blue">
              <span>{subtitleDisplay}</span>
              {!subtitleComplete && <span className="animate-blink">█</span>}
            </h2>
          )}
        </div>

        {/* Code Introduction */}
        {subtitleComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <CodeBlock 
              code={codeExample}
              language="javascript"
              animated={true}
              speed={20}
            />
          </motion.div>
        )}

        {/* Interactive Terminal */}
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-lg text-terminal-yellow text-center">
              Try the interactive terminal below:
            </h3>
            <Terminal />
            <p className="text-sm text-gray-400 text-center">
              Type "help" to see available commands, or use navigation above
            </p>
          </motion.div>
        )}

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 pt-8"
        >
          {['about', 'projects', 'skills', 'certificates', 'contact'].map((item) => (
            <motion.a
              key={item}
              href={`/${item}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-terminal-border hover:bg-terminal-blue hover:text-black rounded-md transition-colors duration-200 font-mono text-sm"
            >
              ./{item}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
      </div>
    </>
  );
};

export default Home;