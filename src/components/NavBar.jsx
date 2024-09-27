import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      src: "https://res.cloudinary.com/dh60kpxg5/image/upload/v1727013096/migration_sw60dm.jpg",
      alt: "migration",
      overlayText: (
        <div className="absolute z-50 inset-0 flex flex-col pt-8 sm:pt-10 md:pt-20 pl-3 sm:pl-5 md:pl-20 bg-black bg-opacity-40 text-white">
          <p className="text-sm sm:text-lg md:text-4xl font-extrabold mb-4 sm:mb-10 md:mb-20">
            CONNECT DECENTRALIZED WEB APPLICATIONS <br className="hidden md:block" />
            TO MOBILE WALLETS.
          </p>
          <div className="space-x-2 sm:space-x-4">
            <Link onClick={()=>{console.log("object")}} to="/wallets" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 sm:py-2 sm:px-4 rounded">
              READ MORE
            </Link>
            <Link to="/wallets" className="bg-gray-700 hover:bg-gray-800 text-white py-1 px-2 sm:py-2 sm:px-4 rounded">
              RESOLVE
            </Link>
          </div>
        </div>
      ),
    },
    {
      src: "https://res.cloudinary.com/dh60kpxg5/image/upload/v1727013095/mainnetz_edzzrx.jpg",
      alt: "mainnetz",
      overlayText: (
        <div className="absolute z-50 inset-0 flex flex-col pt-8 sm:pt-10 md:pt-20 pl-3 sm:pl-5 md:pl-20 bg-black bg-opacity-40 text-white">
          <p className="text-sm sm:text-lg md:text-4xl font-extrabold mb-4 sm:mb-10 md:mb-20">
            WE WILL SUPPORT YOU IN ANY RELATED ISSUES <br className="hidden md:block" />
            WITH RECTIFICATION IN YOUR WALLET.
          </p>
          <div className="space-x-2 sm:space-x-4">
            <Link to="/wallets" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 sm:py-2 sm:px-4 rounded">
              LEARN MORE
            </Link>
            <Link to="/wallets" className="bg-gray-700 hover:bg-gray-800 text-white py-1 px-2 sm:py-2 sm:px-4 rounded">
              RESOLVE
            </Link>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(imageInterval);
  }, [images.length]);

  const handleNext = () => setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  const handlePrevious = () => setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6 md:space-y-8">
      <div className="relative w-full h-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img src={images[currentImage].src} alt={images[currentImage].alt} className="w-full h-auto" />
           <div>{images[currentImage].overlayText}</div>
          </motion.div>
        </AnimatePresence>

        {/* Positioned buttons absolutely within the image */}
        <div className="absolute inset-0 flex justify-between items-center px-2 md:px-6">
          <button
            onClick={handlePrevious}
            className="py-3 px-3 sm:py-4 sm:px-4 md:py-6 md:px-6 rounded-full focus:outline-none"
          >
            <GrPrevious className="text-xl sm:text-2xl md:text-3xl text-gray-400 hover:text-gray-900" />
          </button>
          <button
            onClick={handleNext}
            className="py-3 px-3 sm:py-4 sm:px-4 md:py-6 md:px-6 rounded-full focus:outline-none"
          >
            <GrNext className="text-xl sm:text-2xl md:text-3xl text-gray-400 hover:text-gray-900" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
