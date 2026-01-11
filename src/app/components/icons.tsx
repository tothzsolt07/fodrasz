import React from 'react';

export const ScissorsIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="6" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M20 4 8.12 15.88"/>
    <path d="M14.47 14.48 20 20"/>
    <path d="M8.12 8.12 12 12"/>
  </svg>
);

export const CombIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2v20"/>
    <path d="M8 6v12"/>
    <path d="M16 6v12"/>
    <path d="M4 10v4"/>
    <path d="M20 10v4"/>
  </svg>
);

export const CalendarIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export const MailIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export const PhoneIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    className={className}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

export const LogoIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    className={className}
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill="none"
  >
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
    <path 
      d="M10 12 L16 18 L22 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2" fill="currentColor"/>
    <circle cx="12" cy="22" r="2" fill="currentColor"/>
  </svg>
);
