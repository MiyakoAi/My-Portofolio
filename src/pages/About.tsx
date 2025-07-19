import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';
import { usePageVisit } from '../context/PageVisitContext';
import CodeBlock from '../components/ui/CodeBlock';
import TechIcon from '../components/ui/TechIcon';
import CompanyLogo from '../components/ui/CompanyLogo';
import { skillCategories } from '../constants/skills';
import { personalInfo } from '../constants/personalInfo';
import { experiences } from '../constants/experience';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bio' | 'experience' | 'skills'>('bio');
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  const { isPageVisited, markPageAsVisited } = usePageVisit();
  
  const isAboutVisited = isPageVisited('about');
  
  useEffect(() => {
    // Only mark as visited after animations have time to run
    if (!isAboutVisited) {
      // Give time for CodeBlock animations to start and complete
      const timer = setTimeout(() => {
        markPageAsVisited('about');
      }, 5000); // Increased to 5 seconds for longer code blocks
      
      return () => clearTimeout(timer);
    }
  }, [isAboutVisited, markPageAsVisited]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Portofolio2.pdf';
    link.download = 'Mugni_Adji_CV.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bioCode = `/**
 * About : ${personalInfo.name}
 * Role  : Backend Developer
 */

class Developer {
  constructor() {
    this.name = "${personalInfo.name}";
    this.role = "${personalInfo.title}";
    this.location = "${personalInfo.location}";
    this.email = "${personalInfo.email}";
  }

  getBio() {
    return \`
      Hello, I am Abd. Mugni Adji Susilo, commonly known as Mugni Adji. 
      I am a student majoring in Computer Engineering at the Muslim University of Indonesia, 
      with a particular interest in web development. 
      I enjoy creating digital solutions that are simple yet effective, 
      particularly using JavaScript, and I am eager to continue learning about the latest technologies. 
      I am seeking opportunities to contribute in an environment that fosters creativity and innovation.
    \`;
  }

  getCurrentFocus() {
    return [
      "Building robust APIs with Node.js & Express",
      "Building database structures with MongoDB and MySQL",
      "Prompt enjiner",
    ];
  }

  getValues() {
    return {
      code_quality: "Clean, maintainable,",
      continuous_learning: "Always exploring new technologies",
      collaboration: "I usually work alone",
      user_focus: "Technology should solve real problems"
    };
  }
}

const developer = new Developer();
console.log(developer.getBio());`;

  const renderSkillBar = (skill: any) => {
    const bars = '█'.repeat(Math.floor(skill.level / 5));
    const emptyBars = '░'.repeat(20 - Math.floor(skill.level / 5));
    
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: Math.random() * 0.5 }}
        key={skill.name}
        className="mb-3"
      >
        <div className="flex justify-between text-sm mb-1">
          <span className="text-terminal-blue flex items-center gap-2">
            <TechIcon technology={skill.name} size="sm" />
            {skill.name}
          </span>
          <span className="text-terminal-yellow">{skill.level}%</span>
        </div>
        <div className="font-mono text-terminal-green">
          {bars}<span className="text-gray-600">{emptyBars}</span>
        </div>
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
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-2">
          $ cat about.md
        </h1>
        <p className="text-terminal-text opacity-80">
          Getting to know the developer behind the code
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-terminal-border">
        {[
          { key: 'bio', label: 'Bio', icon: '' },
          { key: 'experience', label: 'Experience', icon: '' },
          { key: 'skills', label: 'Skills', icon: '   ' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 font-mono text-sm rounded-t-lg transition-colors ${
              activeTab === tab.key
                ? 'bg-terminal-border text-terminal-green border-b-2 border-terminal-green'
                : 'text-gray-400 hover:text-terminal-text'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'bio' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <CodeBlock 
              code={bioCode} 
              language="javascript" 
              animated={!isAboutVisited}
              speed={15}
            />
            
            {/* Download CV Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <button
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-6 py-3 bg-terminal-green text-black font-mono font-semibold rounded-lg hover:bg-green-400 transition-colors duration-300 group"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Download CV
              </button>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'experience' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-900 border border-terminal-border rounded-lg overflow-hidden"
              >
                {/* Experience Header - Always Visible */}
                <button
                  onClick={() => setExpandedExperience(expandedExperience === exp.id ? null : exp.id)}
                  className="w-full p-6 text-left hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <CompanyLogo 
                        logoUrl={exp.logoUrl} 
                        companyName={exp.company} 
                        size="md"
                      />
                    </div>
                    
                    {/* Experience Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-terminal-green mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-terminal-blue font-medium truncate">{exp.company}</p>
                          <p className="text-gray-400 text-sm">{exp.location}</p>
                        </div>
                        <div className="flex items-center gap-3 mt-2 md:mt-0">
                          <div className="text-right">
                            <span className="text-terminal-yellow font-mono text-sm">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </span>
                            {exp.current && (
                              <div className="text-green-400 text-xs mt-1">● Currently Active</div>
                            )}
                          </div>
                          {expandedExperience === exp.id ? (
                            <ChevronUp className="w-5 h-5 text-terminal-blue flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-terminal-blue flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                
                {/* Experience Details - Expandable */}
                <AnimatePresence>
                  {expandedExperience === exp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-terminal-border"
                    >
                      <div className="p-6 space-y-4">
                        {/* Description */}
                        <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                        
                        {/* Responsibilities */}
                        <div>
                          <h4 className="text-terminal-yellow text-sm font-semibold mb-2">Key Responsibilities:</h4>
                          <ul className="space-y-1">
                            {exp.responsibilities.map((responsibility, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                <span className="text-terminal-green mt-1 text-xs">▸</span>
                                {responsibility}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-terminal-yellow text-sm font-semibold mb-2">Technologies Used:</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="flex items-center gap-1 px-2 py-1 bg-terminal-border text-xs rounded font-mono"
                              >
                                <TechIcon technology={tech} size="sm" />
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        <div>
                          <h4 className="text-terminal-yellow text-sm font-semibold mb-2">Key Achievements:</h4>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                <span className="text-yellow-400 mt-1 text-xs">★</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-gray-900 border border-terminal-border rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-terminal-yellow mb-4 flex items-center">
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </h3>
                
                <div className="space-y-3">
                  {category.skills.map(renderSkillBar)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default About;