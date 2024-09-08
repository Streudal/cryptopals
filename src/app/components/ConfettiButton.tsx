'use client';

import React, { useState, useEffect } from 'react';

const ConfettiButton: React.FC = () => {
  const [confetti, setConfetti] = useState<(() => void) | null>(null);

  useEffect(() => {
    // Dynamically import the confetti library
    import('canvas-confetti').then((confettiModule) => {
      setConfetti(() => confettiModule.default);
    });
  }, []);

  const handleClick = () => {
   
    if (confetti) {
      confetti();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="from-[#2e026d] text-[hsl(280,100%,70%)]"
        onClick={handleClick}
      >Congratulations! 🎉 
       <div className='flex-wrap text-sm text-white '>click me</div> 
      </button>     
    </div>

  );
};

export default ConfettiButton;