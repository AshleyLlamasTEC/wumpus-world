import React from 'react';

const WumpusIcon = ({ className = "w-6 h-6", color = "currentColor" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <img 
      src="/public/img/wumpus.svg" 
      alt="Wumpus" 
      className="w-full h-full object-contain"
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    />
  </div>
);

export default WumpusIcon;