const Hero = () => {
  return (
    <div className="relative bg-cover bg-center h-[400px] flex items-center justify-center">
      <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col items-center justify-center text-center px-4 sm:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wide text-black">
          Token Rectification
        </h1>
        <hr className="w-12 border-t-2 border-gray-300" />
        <p className="text-base sm:text-lg text-gray-600 max-w-xl">
          Move Your Token From One Blockchain To Another Blockchain.
        </p>
      </div>
    </div>
  );
};

export default Hero;
