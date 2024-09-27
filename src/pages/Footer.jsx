import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when scrolling down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="relative">
      <div className="bg-slate-900 flex justify-center items-center text-orange-600 h-[70px]">
        <h1>Wallet Rectification</h1>
      </div>
      
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-10 right-4   text-orange-400 p-3 rounded-full shadow-lg hover:bg-orange-500 transition duration-300"
        >
          {/* Replace with your icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Footer;
