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
      'C++': '/icons/C++/isocpp-icon.svg',
      'CPP': '/icons/C++/isocpp-icon.svg',
      'Docker': '/icons/Docker/docker-icon.svg',
      'Express': '/icons/ExpressJS/expressjs-icon.svg',
      'Express.js': '/icons/ExpressJS/expressjs-icon.svg',
      'ExpressJS': '/icons/ExpressJS/expressjs-icon.svg',
      'GCP': '/icons/GCP/google_cloud-icon.svg',
      'Google Cloud': '/icons/GCP/google_cloud-icon.svg',
      'Git': '/icons/Git/git-scm-icon.svg',
      'JavaScript': '/icons/JavaScript/javascript-icon.svg',
      'JS': '/icons/JavaScript/javascript-icon.svg',
      'MongoDB': '/icons/MongoDB/mongodb-icon.svg',
      'MySQL': '/icons/MySQL/mysql-icon.svg',
      'Python': '/icons/Python/python-icon.svg',
      'React': '/icons/React/reactjs-icon.svg',
      'ReactJS': '/icons/React/reactjs-icon.svg',
      'Tailwind': '/icons/tailwind/tailwindcss-icon.svg',
      'Tailwind CSS': '/icons/tailwind/tailwindcss-icon.svg',
      'TailwindCSS': '/icons/tailwind/tailwindcss-icon.svg',
      'Node.js': '/icons/NodeJS/nodejs-icon.svg',
      'NodeJS': '/icons/NodeJS/nodejs-icon.svg',
      'Linux': '/icons/Linux/linux-icon.svg',
      'HTML': '/icons/html/w3_html5-icon.svg',
      'HTML/CSS': '/icons/html/w3_html5-icon.svg',
      'CSS': '/icons/CSS/w3_css-icon.svg',
      'Redis': '/icons/Redis/redis-icon.svg',
      'REST API': '/icons/restAPI/rest-api-icon.svg',
      'TypeScript': '/icons/TypeScript/typescriptlang-icon.svg',
      'TS': '/icons/TypeScript/typescriptlang-icon.svg',
      'JWT': '/icons/jwt/jwt-icon.svg',
      'Postman': '/icons/Postman/getpostman-icon.svg',
      'Socket.io': '/icons/Socket/socketio-icon.svg',
      'Socket': '/icons/Socket/socketio-icon.svg',
      'Nginx': '/icons/Nginx/nginx-icon.svg',
      'PHP': '/icons/Php/php-icon.svg',
      'Bootstrap': 'icons/Boostrap/Bootstrap_logo.svg.png',
      'Network': '/icons/SoftSkills/networking.png',
      'Solving Problem': '/icons/SoftSkills/SolvingProblem.png',
      'Communication': '/icons/SoftSkills/communication.png',
      'Team Work': '/icons/SoftSkills/TeamWork.png',
      'JQuery': '/icons/JQuery/jquery-icon.svg',
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
