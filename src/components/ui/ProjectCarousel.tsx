import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectCarouselProps {
  images: string[];
  autoSlide?: boolean;
  interval?: number;
  className?: string;
  onImageClick?: (imageUrl: string, index: number) => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ 
  images, 
  autoSlide = true, 
  interval = 3000,
  className = '',
  onImageClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide effect
  useEffect(() => {
    if (!autoSlide || images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoSlide, interval, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <div className={`relative w-full h-48 bg-gray-800 rounded-lg overflow-hidden group ${className}`}>
      {/* Main Image */}
      <img
        src={images[currentIndex]}
        alt={`Project image ${currentIndex + 1}`}
        className={`w-full h-full object-cover transition-opacity duration-300 ${onImageClick ? 'cursor-pointer hover:opacity-80' : ''}`}
        onClick={() => onImageClick?.(images[currentIndex], currentIndex)}
        onError={(e) => {
          // Fallback untuk gambar yang error
          const target = e.target as HTMLImageElement;
          target.src = '/images/placeholder-project.jpg';
        }}
      />

      {/* Click to enlarge indicator */}
      {onImageClick && (
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          🔍 Click to enlarge
        </div>
      )}

      {/* Navigation Arrows (hanya muncul jika lebih dari 1 gambar) */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-terminal-green' 
                    : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
