const PreModal = ({ wallet, closeModal, proceedToModal }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-black rounded-lg w-[90%] sm:w-[400px] md:w-[500px] p-6">
          {/* Wallet Name and Image */}
          <div className="flex items-center mb-4">
            <img src={wallet.image} alt={wallet.name} className="rounded-full h-[40px] sm:h-[50px]" />
            <h3 className="ml-2 text-lg sm:text-xl font-bold">{wallet.name}</h3>
          </div>
  
          {/* Error Message */}
          <div className="mb-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline">
                Error connecting wallet automatically. Please connect manually.
              </span>
            </div>
          </div>
  
          {/* Proceed and Cancel Buttons */}
          <div className="flex flex-col items-center space-y-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-[90%] md:w-[450px]"
              onClick={proceedToModal} // Go to Modal on click
            >
              PROCEED
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md w-[150px] sm:w-auto sm:px-6"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PreModal;
  