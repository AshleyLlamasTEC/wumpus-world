import React from 'react';

const PersonIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img 
      src="/public/img/person-blue.svg" 
      alt="Person" 
      className="w-full h-full object-contain"
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    />
  </div>
);

export default PersonIcon;