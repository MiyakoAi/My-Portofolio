import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Code, Database, Server, Wrench } from 'lucide-react';
import { usePageVisit } from '../context/PageVisitContext';
import { skillCategories } from '../constants/skills';
import type { Skill, SkillCategory } from '../constants/skills';
import CodeBlock from '../components/ui/CodeBlock';
import TechIcon from '../components/ui/TechIcon';

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [animateSkills, setAnimateSkills] = useState(false);
  const { isPageVisited, markPageAsVisited } = usePageVisit();
  
  const isSkillsVisited = isPageVisited('skills');

  useEffect(() => {
    if (!isSkillsVisited) {
      // Give time for CodeBlock animations to start and complete
      const markTimer = setTimeout(() => {
        markPageAsVisited('skills');
      }, 5000); // Increased to 5 seconds
      
      const animateTimer = setTimeout(() => setAnimateSkills(true), 500);
      
      return () => {
        clearTimeout(markTimer);
        clearTimeout(animateTimer);
      };
    } else {
      // If page was visited before, show skills immediately
      setAnimateSkills(true);
    }
  }, [isSkillsVisited, markPageAsVisited]);

  const skillsOverviewCode = `// Skills Assessment - Real-time evaluation
const developer = {
  name: "Mugni Adji",
  role: "Ai Promnter",
  
  getSkillMatrix() {
    return {
      backend: {
        nodejs: { level: 80, experience: "1 years", projects: 3 },
        express: { level: 70, experience: "1 years", projects: 3 },
        python: { level: 40, experience: "1 years", projects: 0 },
        databases: {
          mongodb: { level: 50, experience: "1 years" },
          mysql: { level: 70, experience: "1 years" }
        }
      },
      
      frontend: {
        javascript: { level: 80, experience: "1 years" },
        typescript: { level: 5, experience: "1 years" },
        react: { level: 5, experience: "1 years" },
        tailwindcss: { level: 10, experience: "1 year" }
      },
      
      devops: {
        docker: { level: 50, experience: "1 years" },
        gcp: { level: 50, experience: "1 year" },
        linux: { level: 40, experience: "1 years" },
        git: { level: 85, experience: "1 years" }
      }
    };
  },
  
  getCurrentLearning() {
    return [
      "Web3 Fundamentals",
      "Golang programming language",
      "Machine Learning fundamentals"
    ];
  }
};

// Real-time skill progression
console.log("Skills last updated:", new Date().toISOString());`;

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'backend development':
        return <Server className="w-6 h-6" />;
      case 'frontend development':
        return <Code className="w-6 h-6" />;
      case 'devops & tools':
        return <Wrench className="w-6 h-6" />;
      default:
        return <Database className="w-6 h-6" />;
    }
  };

  const renderSkillProgressBar = (skill: Skill, index: number) => {
    const progressWidth = animateSkills ? skill.level : 0;
    
    return (
      <motion.div
        key={skill.name}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-gray-800 border border-terminal-border rounded-lg p-4 hover:border-terminal-green transition-all duration-300 group"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TechIcon technology={skill.name} size="sm" />
            <span className="font-semibold text-terminal-text">{skill.name}</span>
          </div>
          <span className="text-terminal-yellow font-mono text-sm">{skill.level}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-terminal-green to-terminal-blue rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressWidth}%` }}
            transition={{ delay: index * 0.1 + 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </div>
        
        {/* Additional Info */}
        <div className="flex justify-between text-xs text-gray-400">
          <span>{skill.category}</span>
          {skill.yearsOfExperience && (
            <span>{skill.yearsOfExperience} year{skill.yearsOfExperience > 1 ? 's' : ''}</span>
          )}
        </div>
        
        {/* Terminal-style progress visualization */}
        <div className="mt-2 font-mono text-xs text-terminal-green opacity-0 group-hover:opacity-100 transition-opacity">
          {'█'.repeat(Math.floor(skill.level / 5))}          
          {'+'.repeat(20 - Math.floor(skill.level / 5))}
          <span className="ml-2 text-terminal-yellow">[{skill.level}/100]</span>
        </div>
      </motion.div>
    );
  };

  const renderSkillCategory = (category: SkillCategory, index: number) => {
    const isExpanded = selectedCategory === category.name;
    
    return (
      <motion.div
        key={category.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="border border-terminal-border rounded-lg overflow-hidden bg-gray-900"
      >
        {/* Category Header */}
        <button
          onClick={() => setSelectedCategory(isExpanded ? null : category.name)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-center gap-3">
            {getCategoryIcon(category.name)}
            <div className="text-left">
              <h3 className="text-lg font-semibold text-terminal-green">
                {category.name}
              </h3>
              <p className="text-sm text-gray-400">
                {category.skills.length} skills
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-right text-sm">
              <div className="text-terminal-yellow font-mono">
                Avg: {Math.round(category.skills.reduce((acc: number, skill: Skill) => acc + skill.level, 0) / category.skills.length)}%
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-terminal-blue" />
            ) : (
              <ChevronDown className="w-5 h-5 text-terminal-blue" />
            )}
          </div>
        </button>
        
        {/* Category Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-terminal-border"
            >
              <div className="p-4 space-y-4">
                {category.skills.map((skill: Skill, skillIndex: number) => 
                  renderSkillProgressBar(skill, skillIndex)
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

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
          $ which skills
        </h1>
        <p className="text-terminal-text opacity-80">
          Technical expertise and proficiency levels
        </p>
      </div>

      {/* Skills Overview Code */}
      <div className="mb-8">
        <CodeBlock 
          code={skillsOverviewCode}
          language="javascript"
          animated={!isSkillsVisited}
          speed={20}
        />
      </div>

      {/* Skills Categories */}
      <div className="space-y-4 mb-8">
        {skillCategories.map((category, index) => renderSkillCategory(category, index))}
      </div>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-900 border border-terminal-border rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold text-terminal-yellow mb-4">
          Current Learning Focus
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-terminal-green font-semibold mb-2">Expanding Knowledge</h4>
            <ul className="space-y-1 text-gray-300">
              <li>• Kubernetes & Container Orchestration</li>
              <li>• GraphQL API Development</li>
              <li>• Microservices Architecture Patterns</li>
              <li>• Cloud Security Best Practices</li>
            </ul>
          </div>
          <div>
            <h4 className="text-terminal-green font-semibold mb-2">Next on Roadmap</h4>
            <ul className="space-y-1 text-gray-300">
              <li>• Golang Programming Language</li>
              <li>• Machine Learning Fundamentals</li>
              <li>• Serverless Architecture</li>
              <li>• Web3 & Blockchain Development</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Interactive Tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-sm text-gray-400 mt-6"
      >
        Click on each category to expand and see detailed skill breakdowns
      </motion.div>

      {/* Reset Button */}

    </motion.div>
  );
};

export default Skills;