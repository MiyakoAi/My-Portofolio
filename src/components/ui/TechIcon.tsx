import React from 'react';

interface TechIconProps {
  technology: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const TechIcon: React.FC<TechIconProps> = ({ technology, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  // Map technology names to their icon paths in public folder
  const getIconPath = (tech: string): string | null => {
    const iconMap: { [key: string]: string } = {
      'C++': '/src/assets/icons/C++/isocpp-icon.svg',
      'CPP': '/src/assets/icons/C++/isocpp-icon.svg',
      'Docker': '/src/assets/icons/Docker/docker-icon.svg',
      'Express': '/src/assets/icons/ExpressJS/expressjs-icon.svg',
      'Express.js': '/src/assets/icons/ExpressJS/expressjs-icon.svg',
      'ExpressJS': '/src/assets/icons/ExpressJS/expressjs-icon.svg',
      'GCP': '/src/assets/icons/GCP/google_cloud-icon.svg',
      'Google Cloud': '/src/assets/icons/GCP/google_cloud-icon.svg',
      'Git': '/src/assets/icons/Git/git-scm-icon.svg',
      'JavaScript': '/src/assets/icons/JavaScript/javascript-icon.svg',
      'JS': '/src/assets/icons/JavaScript/javascript-icon.svg',
      'MongoDB': '/src/assets/icons/MongoDB/mongodb-icon.svg',
      'MySQL': '/src/assets/icons/MySQL/mysql-icon.svg',
      'Python': '/src/assets/icons/Python/python-icon.svg',
      'React': '/src/assets/icons/React/reactjs-icon.svg',
      'ReactJS': '/src/assets/icons/React/reactjs-icon.svg',
      'Tailwind': '/src/assets/icons/tailwind/tailwindcss-icon.svg',
      'Tailwind CSS': '/src/assets/icons/tailwind/tailwindcss-icon.svg',
      'TailwindCSS': '/src/assets/icons/tailwind/tailwindcss-icon.svg',
      'Node.js': '/src/assets/icons/NodeJS/nodejs-icon.svg',
      'NodeJS': '/src/assets/icons/NodeJS/nodejs-icon.svg',
      'Linux': '/src/assets/icons/Linux/linux-icon.svg',
      'HTML': '/src/assets/icons/html/w3_html5-icon.svg',
      'HTML/CSS': '/src/assets/icons/html/w3_html5-icon.svg',
      'CSS': '/src/assets/icons/CSS/css-icon.svg',
      'Redis': '/src/assets/icons/Redis/redis-icon.svg',
      'REST API': '/src/assets/icons/restAPI/rest-api-icon.svg',
      'TypeScript': '/src/assets/icons/TypeScript/typescriptlang-icon.svg',
      'TS': '/src/assets/icons/TypeScript/typescriptlang-icon.svg',
      'JWT': '/src/assets/icons/jwt/jwt-icon.svg',
      'Postman': '/src/assets/icons/Postman/getpostman-icon.svg',
      'Socket.io': '/src/assets/icons/Socket/socketio-icon.svg',
    };
    
    return iconMap[tech] || null;
  };

  const iconPath = getIconPath(technology);
  
  if (!iconPath) {
    // Fallback: show emoji or first letter if no icon found
    const fallbackEmoji: { [key: string]: string } = {
      'Cloud Architecture': '☁️',
      'System Design': '🏗️',
      'Security': '🔒',
      'DevOps': '⚙️',
      'Database': '💾',
      'API': '🔌',
      'Microservices': '🔗',
      'Monitoring': '📊',
      'Testing': '🧪',
      'Performance': '⚡',
      'Scalability': '📈',
      'Automation': '🤖',
      'CI/CD': '🔄',
      'Machine Learning': '🤖',
      'Data Science': '📊',
      'Analytics': '📈',
      'Backend Development': '⚙️',
      'Frontend Development': '🎨',
      'Full Stack': '⚡',
    };

    return (
      <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
        {fallbackEmoji[technology] ? (
          <span className={`${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}`}>
            {fallbackEmoji[technology]}
          </span>
        ) : (
          <div className={`bg-gray-700 rounded-sm flex items-center justify-center ${sizeClasses[size]} text-xs font-mono text-gray-300`}>
            {technology.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={iconPath}
      alt={technology}
      className={`${sizeClasses[size]} ${className} object-contain`}
      onError={(e) => {
        // Fallback to first letter if image fails to load
        const target = e.target as HTMLImageElement;
        const parent = target.parentElement;
        if (parent) {
          parent.innerHTML = `<div class="${sizeClasses[size]} ${className} bg-gray-700 rounded-sm flex items-center justify-center text-xs font-mono text-gray-300">${technology.charAt(0).toUpperCase()}</div>`;
        }
      }}
    />
  );
};

export default TechIcon;
