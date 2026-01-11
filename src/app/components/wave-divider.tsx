import React from 'react';

interface WaveDividerProps {
  position?: 'top' | 'bottom';
  flip?: boolean;
  className?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({ 
  position = 'bottom', 
  flip = false,
  className = '' 
}) => {
  const isTop = position === 'top';
  
  return (
    <div className={`wave-divider absolute left-0 right-0 ${isTop ? 'top-0' : 'bottom-0'} w-full overflow-hidden leading-none ${className}`}>
      <svg 
        className={`relative block w-full ${isTop ? 'rotate-180' : ''}`}
        style={{ height: '120px' }}
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,0 L0,50 C200,90 400,20 600,50 C800,80 1000,20 1200,60 L1200,0 Z" 
          className="fill-current"
          style={{ 
            opacity: 0.1,
            color: '#FFD400'
          }}
        />
      </svg>
    </div>
  );
};

// Variant for sections with card background
export const WaveDividerCard: React.FC<WaveDividerProps> = ({ 
  position = 'bottom', 
  flip = false,
  className = '' 
}) => {
  const isTop = position === 'top';
  
  return (
    <div className={`wave-divider absolute left-0 right-0 ${isTop ? 'top-0' : 'bottom-0'} w-full overflow-hidden leading-none ${className}`}>
      <svg 
        className={`relative block w-full ${isTop ? 'rotate-180' : ''}`}
        style={{ height: '120px' }}
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,0 L0,60 C250,100 450,30 600,60 C750,90 950,30 1200,50 L1200,0 Z" 
          className="fill-current"
          style={{ 
            opacity: 0.08,
            color: '#FFD400'
          }}
        />
      </svg>
    </div>
  );
};

// Variant for primary (yellow) sections
export const WaveDividerPrimary: React.FC<WaveDividerProps> = ({ 
  position = 'bottom', 
  flip = false,
  className = '' 
}) => {
  const isTop = position === 'top';
  
  return (
    <div className={`wave-divider absolute left-0 right-0 ${isTop ? 'top-0' : 'bottom-0'} w-full overflow-hidden leading-none ${className}`}>
      <svg 
        className={`relative block w-full ${isTop ? 'rotate-180' : ''}`}
        style={{ height: '120px' }}
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,0 L0,50 C300,95 500,25 600,50 C700,75 900,30 1200,65 L1200,0 Z" 
          className="fill-primary"
        />
      </svg>
    </div>
  );
};