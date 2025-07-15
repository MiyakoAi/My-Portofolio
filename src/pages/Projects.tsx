import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Github, Calendar } from 'lucide-react';
import { projects, projectCategories } from '../constants/projects';
import type { Project } from '../constants/projects';
import TechIcon from '../components/ui/TechIcon';
import ProjectCarousel from '../components/ui/ProjectCarousel';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedAndFilteredProjects = useMemo(() => {
    const filtered = projects.filter(project => {
      const matchesCategory = selectedCategory === 'all' || 
                             project.categories.includes(selectedCategory as any);
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          const dateA = new Date(a.startDate).getTime();
          const dateB = new Date(b.startDate).getTime();
          comparison = dateA - dateB;
          break;
        case 'status':
          const statusOrder = { 'completed': 0, 'in-progress': 1, 'planning': 2 };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [selectedCategory, searchTerm, sortBy, sortOrder]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-terminal-green';
      case 'in-progress': return 'text-terminal-yellow';
      case 'planning': return 'text-terminal-blue';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🚧';
      case 'planning': return '📋';
      default: return '❓';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-terminal-green mb-2">
          $ ls projects/
        </h1>
        <p className="text-terminal-text opacity-80">
          Showcase of my development projects and contributions
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search projects... (try 'api', 'react', 'node')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-terminal-border rounded-lg font-mono text-terminal-text placeholder-gray-400 focus:border-terminal-green focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-terminal-green text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
          
          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-800 border border-terminal-border rounded px-3 py-1 text-sm text-gray-300 focus:border-terminal-green focus:outline-none"
            >
              <option value="date">Date</option>
              <option value="status">Status</option>
              <option value="name">Name</option>
            </select>
            
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-1 bg-gray-800 border border-terminal-border rounded text-sm hover:bg-gray-700 transition-colors flex items-center gap-1"
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedAndFilteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 border border-terminal-border rounded-lg overflow-hidden hover:border-terminal-green transition-colors cursor-pointer group"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-terminal-green group-hover:text-terminal-yellow transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {project.imageUrls && project.imageUrls.length > 0 && (
                      <span className="text-xs bg-terminal-green bg-opacity-20 text-terminal-green px-2 py-1 rounded border border-terminal-green border-opacity-30">
                        📷 {project.imageUrls.length} image{project.imageUrls.length > 1 ? 's' : ''}
                      </span>
                    )}
                    {project.featured && (
                      <span className="text-yellow-400 text-lg">⭐</span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className={`flex items-center gap-1 ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)} {project.status.replace('-', ' ')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {project.startDate}
                  </span>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="flex items-center gap-1 px-2 py-1 bg-terminal-border text-xs rounded font-mono text-terminal-blue"
                    >
                      <TechIcon technology={tech} size="sm" />
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-xs rounded font-mono text-gray-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs transition-colors"
                    >
                      <Github className="w-3 h-3" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 px-3 py-1 bg-terminal-green text-black hover:bg-green-400 rounded text-xs transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* No Results */}
      {sortedAndFilteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl text-gray-400 mb-2">No projects found</h3>
          <p className="text-gray-500">
            Try adjusting your search terms or category filter
          </p>
        </motion.div>
      )}

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-terminal-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gray-800 p-4 border-b border-terminal-border flex items-center justify-between">
                <h2 className="text-2xl font-bold text-terminal-green">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Project Images Carousel in Modal */}
                {selectedProject.imageUrls && selectedProject.imageUrls.length > 0 && (
                  <div className="mb-6">
                    <ProjectCarousel 
                      images={selectedProject.imageUrls} 
                      className="h-64"
                      autoSlide={false}
                    />
                  </div>
                )}

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <span className={`ml-2 ${getStatusColor(selectedProject.status)}`}>
                      {getStatusIcon(selectedProject.status)} {selectedProject.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Categories:</span>
                    <div className="ml-2 flex flex-wrap gap-1 mt-1">
                      {selectedProject.categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 bg-terminal-blue bg-opacity-20 text-terminal-blue text-xs rounded border border-terminal-blue border-opacity-30"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Timeline:</span>
                    <span className="ml-2 text-terminal-yellow">
                      {selectedProject.startDate} - {selectedProject.endDate || 'Present'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-terminal-yellow mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold text-terminal-yellow mb-2">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-terminal-border rounded-full text-sm font-mono text-terminal-blue"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                {selectedProject.highlights && (
                  <div>
                    <h3 className="text-lg font-semibold text-terminal-yellow mb-2">Key Highlights</h3>
                    <ul className="space-y-2">
                      {selectedProject.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                          <span className="text-terminal-green mt-1">▸</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-terminal-border">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View Source Code
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-terminal-green text-black hover:bg-green-400 rounded transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;