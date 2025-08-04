import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Github, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, projectCategories } from '../constants/projects';
import type { Project } from '../constants/projects';
import SEO from '../components/common/SEO';
import TechIcon from '../components/ui/TechIcon';
import ProjectCarousel from '../components/ui/ProjectCarousel';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'name' | 'featured'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [imageZoom, setImageZoom] = useState<number>(1);
  const [imagePan, setImagePan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Handle ESC key for closing modals
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (enlargedImage) {
          setEnlargedImage(null);
          resetImageControls();
        } else if (selectedProject) {
          setSelectedProject(null);
        }
      } else if (enlargedImage && selectedProject?.imageUrls && selectedProject.imageUrls.length > 1) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          navigateImage('prev');
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          navigateImage('next');
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [enlargedImage, selectedProject, currentImageIndex]);

  // Handle wheel event for image zoom with non-passive listener
  useEffect(() => {
    const container = imageContainerRef.current;
    if (container && enlargedImage) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, [enlargedImage]);

  const resetImageControls = () => {
    setImageZoom(1);
    setImagePan({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const handleImageZoom = (delta: number) => {
    setImageZoom(prev => {
      const newZoom = prev + delta;
      const clampedZoom = Math.max(0.5, Math.min(2.5, newZoom)); // Reduced max zoom
      
      // Reset pan when zooming to prevent overflow
      if (clampedZoom !== prev) {
        setImagePan({ x: 0, y: 0 });
      }
      
      return clampedZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (imageZoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePan.x, y: e.clientY - imagePan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && imageZoom > 1) {
      const newPanX = e.clientX - dragStart.x;
      const newPanY = e.clientY - dragStart.y;
      
      // Much more restrictive pan limits
      const maxPan = 50 * Math.max(0, imageZoom - 1); // Even smaller limit
      const clampedX = Math.max(-maxPan, Math.min(maxPan, newPanX));
      const clampedY = Math.max(-maxPan, Math.min(maxPan, newPanY));
      
      setImagePan({
        x: clampedX,
        y: clampedY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    handleImageZoom(delta);
  };

  const handleImageClick = (imageUrl: string, index: number = 0) => {
    setEnlargedImage(imageUrl);
    setCurrentImageIndex(index);
    resetImageControls();
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedProject?.imageUrls) return;
    
    const newIndex = direction === 'prev' 
      ? (currentImageIndex - 1 + selectedProject.imageUrls.length) % selectedProject.imageUrls.length
      : (currentImageIndex + 1) % selectedProject.imageUrls.length;
    
    setCurrentImageIndex(newIndex);
    setEnlargedImage(selectedProject.imageUrls[newIndex]);
    resetImageControls();
  };

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
        case 'featured':
          // Featured projects first
          const aFeatured = a.featured ? 1 : 0;
          const bFeatured = b.featured ? 1 : 0;
          comparison = bFeatured - aFeatured;
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
    <>
      <SEO 
        title="Projects"
        description="Portofolio project - Kumpulan project backend development, API development, dan full stack applications"
        keywords="projects, backend projects, api development, full stack projects, node.js projects"
        image="https://mugniadji.com/assets/projects/1737340417551_Page_01.png"
      />
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
              <option value="featured">Featured</option>
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
                  <X className="w-6 h-6" />
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
                      onImageClick={(imageUrl, index) => handleImageClick(imageUrl, index)}
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

      {/* Image Lightbox */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 z-[60]"
            onClick={() => {
              setEnlargedImage(null);
              resetImageControls();
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full h-full flex flex-col max-h-screen"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between mb-4 px-2 z-50 relative bg-black bg-opacity-20 rounded-lg backdrop-blur-sm flex-shrink-0">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">{selectedProject?.title}</h3>
                  <p className="text-gray-300 text-sm">
                    Image {currentImageIndex + 1} of {selectedProject?.imageUrls?.length || 1}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Image Navigation */}
                  {selectedProject?.imageUrls && selectedProject.imageUrls.length > 1 && (
                    <div className="flex items-center gap-1 bg-gray-800 rounded-lg px-1 py-1 mr-2">
                      <button
                        onClick={() => navigateImage('prev')}
                        className="text-white hover:text-gray-300 p-2 hover:bg-gray-700 rounded"
                        title="Previous Image"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigateImage('next')}
                        className="text-white hover:text-gray-300 p-2 hover:bg-gray-700 rounded"
                        title="Next Image"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1 bg-gray-800 rounded-lg px-2 py-1">
                    <button
                      onClick={() => handleImageZoom(-0.25)}
                      className="text-white hover:text-gray-300 px-2 py-1 hover:bg-gray-700 rounded text-lg"
                      title="Zoom Out"
                    >
                      −
                    </button>
                    <span className="text-white text-sm px-2 min-w-[3rem] text-center">
                      {Math.round(imageZoom * 100)}%
                    </span>
                    <button
                      onClick={() => handleImageZoom(0.25)}
                      className="text-white hover:text-gray-300 px-2 py-1 hover:bg-gray-700 rounded text-lg"
                      title="Zoom In"
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        setImageZoom(1);
                        setImagePan({ x: 0, y: 0 });
                      }}
                      className="text-white hover:text-gray-300 px-2 py-1 hover:bg-gray-700 rounded text-sm ml-1"
                      title="Reset Zoom"
                    >
                      Reset
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setEnlargedImage(null);
                      resetImageControls();
                    }}
                    className="text-white hover:text-gray-300 text-2xl p-2 hover:bg-gray-800 rounded-full transition-colors"
                    title="Close (Press Esc)"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              {/* Enlarged Image Container */}
              <div 
                className="flex-1 relative bg-gray-900"
                style={{
                  height: 'calc(100vh - 200px)',
                  maxHeight: 'calc(100vh - 200px)',
                  minHeight: '400px',
                  overflow: 'hidden',
                  contain: 'layout style paint size',
                  isolation: 'isolate',
                  position: 'relative',
                  maskImage: 'linear-gradient(to bottom, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%)'
                }}
              >
                {/* Absolute containment layer */}
                <div 
                  className="absolute inset-2"
                  style={{
                    overflow: 'hidden',
                    clipPath: 'inset(10px)',
                    WebkitClipPath: 'inset(10px)',
                    borderRadius: '8px'
                  }}
                >
                  <div 
                    ref={imageContainerRef}
                    className="w-full h-full relative"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{ 
                      cursor: imageZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: `translate(-50%, -50%)`,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      <img
                        src={enlargedImage}
                        alt={selectedProject?.title || 'Project Image'}
                        className="rounded-lg shadow-2xl select-none block"
                        style={{
                          transform: `scale(${Math.min(imageZoom, 2.5)}) translate(${imagePan.x * 0.5}px, ${imagePan.y * 0.5}px)`,
                          maxWidth: imageZoom === 1 ? '85%' : '100%',
                          maxHeight: imageZoom === 1 ? '85%' : '100%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                          transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                          transformOrigin: 'center center'
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTQ5NEE0IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc2Nzc3IiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjEyIj7wn5OHPC90ZXh0Pgo8L3N2Zz4K';
                        }}
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Navigation Arrows - Only show when multiple images and not zoomed */}
                {selectedProject?.imageUrls && selectedProject.imageUrls.length > 1 && imageZoom === 1 && (
                  <>
                    <button
                      onClick={() => navigateImage('prev')}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all opacity-75 hover:opacity-100 z-30"
                      title="Previous Image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    
                    <button
                      onClick={() => navigateImage('next')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all opacity-75 hover:opacity-100 z-30"
                      title="Next Image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Lightbox Footer */}
              <div className="mt-4 text-center z-50 relative flex-shrink-0">
                <div className="bg-gray-800 bg-opacity-90 rounded-lg px-4 py-2 inline-block backdrop-blur-sm border border-gray-600">
                  <p className="text-gray-300 text-sm mb-1">
                    Use mouse wheel to zoom • Click and drag to pan when zoomed
                  </p>
                  {selectedProject?.imageUrls && selectedProject.imageUrls.length > 1 && (
                    <p className="text-gray-300 text-xs mb-1">
                      Use ← → arrow keys or buttons to navigate images
                    </p>
                  )}
                  <p className="text-gray-400 text-xs">
                    Click outside or press ESC to close
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Projects;