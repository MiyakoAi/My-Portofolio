import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTypewriter } from '../hooks/useTypewriter';
import { usePageVisit } from '../context/PageVisitContext';
import Terminal from '../components/ui/Terminal';
import CodeBlock from '../components/ui/CodeBlock';
import SEO from '../components/common/SEO';
import { personalInfo } from '../constants/personalInfo';

const Home: React.FC = () => {
  const [showTerminal, setShowTerminal] = useState(false);
  const [startSubtitle, setStartSubtitle] = useState(false);
  const [hasRunInitialAnimation, setHasRunInitialAnimation] = useState(false);
  const { isPageVisited, markPageAsVisited } = usePageVisit();
  
  const isHomeVisited = isPageVisited('home');
  
  useEffect(() => {
    // Only skip animations on the very first load if already visited
    if (isHomeVisited && !hasRunInitialAnimation) {
      setStartSubtitle(true);
      setShowTerminal(true);
      setHasRunInitialAnimation(true);
    }
    // Don't mark as visited here - let the animations complete first
  }, [isHomeVisited, hasRunInitialAnimation]);
  
  const welcomeText = `Hello Sekai, I'm ${personalInfo.name}`;
  const subtitleText = `Lazy Programmer and Skroll Enjiner`/*personalInfo.title*/;

  const { displayText: welcomeDisplay, isComplete: welcomeComplete } = useTypewriter({
    text: welcomeText,
    speed: 50, // Always use normal speed for better UX
    onComplete: () => {
      if (!hasRunInitialAnimation) {
        setTimeout(() => setStartSubtitle(true), 500);
        setTimeout(() => setShowTerminal(true), 1000);
        // Mark page as visited after all animations complete (longer delay)
        setTimeout(() => {
          markPageAsVisited('home');
          setHasRunInitialAnimation(true);
        }, 5000);
      } else {
        // On return visits, still show subtitle and terminal
        setStartSubtitle(true);
        setShowTerminal(true);
      }
    }
  });

  const { displayText: subtitleDisplay, isComplete: subtitleComplete } = useTypewriter({
    text: (startSubtitle || hasRunInitialAnimation) ? subtitleText : '',
    speed: 50, // Always use normal speed
    delay: 0
  });

  const codeExample = `// Welcome to my portfolio
const developer = {
  name: "${personalInfo.name}",
  role: "${personalInfo.title}",
  location: "${personalInfo.location}",
  passions: ["Skroll Enjiner", "Lazy Programmer", "Ai Promptting"],
  
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
        description="Portfolio"
        keywords="backend developer JavaScript"
        image="https://my-portofolio-tau-ten.vercel.app/Tumbnail.png"
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
            {welcomeDisplay.length > 0 && !welcomeComplete && (
              <span className="animate-blink">█</span>
            )}
          </h1>
          
          {startSubtitle && (
            <h2 className="text-xl md:text-2xl text-terminal-blue">
              <span>{subtitleDisplay}</span>
              {subtitleDisplay.length > 0 && !subtitleComplete && (
                <span className="animate-blink">█</span>
              )}
            </h2>
          )}
        </div>

        {/* Code Introduction */}
        {(subtitleComplete || hasRunInitialAnimation) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: hasRunInitialAnimation ? 0 : 0.3, duration: 0.6 }}
          >
            <CodeBlock 
              code={codeExample}
              language="javascript"
              animated={!hasRunInitialAnimation}
              speed={20}
            />
          </motion.div>
        )}

        {/* Interactive Terminal */}
        {(showTerminal || hasRunInitialAnimation) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: hasRunInitialAnimation ? 0 : 0.5, duration: 0.6 }}
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
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={`/${item}`}
                className="block px-4 py-2 bg-terminal-border hover:bg-terminal-blue hover:text-black rounded-md transition-colors duration-200 font-mono text-sm"
              >
                ./{item}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      </div>
    </>
  );
};

export default Home;