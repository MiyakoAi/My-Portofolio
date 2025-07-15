import React from 'react';

interface CompanyLogoProps {
  logoUrl?: string;
  companyName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ 
  logoUrl, 
  companyName, 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  // Get company initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`${companyName} logo`}
        className={`${sizeClasses[size]} ${className} object-contain rounded-lg bg-white p-1`}
        onError={(e) => {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div class="${sizeClasses[size]} ${className} bg-gradient-to-br from-terminal-blue to-terminal-green rounded-lg flex items-center justify-center font-bold text-white ${textSizeClasses[size]}">
                ${getInitials(companyName)}
              </div>
            `;
          }
        }}
      />
    );
  }

  // Fallback: Show company initials
  return (
    <div className={`${sizeClasses[size]} ${className} bg-gradient-to-br from-terminal-blue to-terminal-green rounded-lg flex items-center justify-center font-bold text-white ${textSizeClasses[size]}`}>
      {getInitials(companyName)}
    </div>
  );
};

export default CompanyLogo;
