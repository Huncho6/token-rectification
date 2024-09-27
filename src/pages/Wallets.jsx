import React, { useState, useEffect } from "react";
import { walletData } from "../utils/walletData";
import { IoCubeOutline } from "react-icons/io5";
import PreModal from "./PreModal";
import Modal from "./Modal";
import { ClipLoader } from "react-spinners"; // Import spinner
import Filter from "./Filter";

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null); // For storing selected wallet
  const [showPreModal, setShowPreModal] = useState(false); // PreModal visibility
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [loadingModal, setLoadingModal] = useState(true); // Spinner loading
  const [filteredWallets, setFilteredWallets] = useState([]); // To store and display filtered wallets

  const handleFilter = (filters) => {
    const { name } = filters;
    // Filter based on search term or show all wallets if no search term
    const filtered = wallets.filter((wallet) => {
      const matchesName = name
        ? wallet.name.toLowerCase().includes(name.toLowerCase())
        : true; // Show all if no search
      return matchesName;
    });
    setFilteredWallets(filtered);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = walletData;
      setWallets(res); // Set the full wallet list
      setFilteredWallets(res); // Initialize filteredWallets with the full list of wallets
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch wallet data on component mount
  }, []);

  const openPreModal = (wallet) => {
    setSelectedWallet(wallet);
    setShowPreModal(true);

    setLoadingModal(true);
    setTimeout(() => {
      setLoadingModal(false);
    }, 2000); // Show spinner for 2 seconds
  };

  const closePreModal = () => {
    setSelectedWallet(null);
    setShowPreModal(false);
    setLoadingModal(true);
  };

  const proceedToModal = () => {
    setShowPreModal(false); // Close PreModal
    setShowModal(true); // Open Modal
  };

  const closeModal = () => {
    setShowModal(false); // Close Modal
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="mx-auto px-4 py-8 bg-black">
      <div className="flex justify-center mb-10">
        <IoCubeOutline className="w-16 h-16 text-blue-500" />
      </div>
       {/* Search Filter */}
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
       <div className="ml-4 sm:ml-10 mb-4 sm:mb-0">
       <p className="font-extrabold text-2xl sm:text-5xl text-white mb-1 sm:pr-20">
          Connect Wallet
        </p>
        <h1 className="text-white text-sm sm:text-base ml-2 sm:ml-4">
           Please connect your wallet to continue
        </h1>
      </div>
       <div className="w-full sm:w-auto">
       <Filter onFilter={handleFilter} />
       </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {filteredWallets.map((item, index) => (
          <div
            key={index}
            className="bg-black text-white p-4 rounded-lg text-center transition-transform hover:scale-105 cursor-pointer"
            onClick={() => openPreModal(item)} // Open PreModal when clicked
          >
            <div className="flex justify-center items-center mb-4 h-[40px] w-full">
              <img
                src={item.image}
                alt={item.name}
                className="max-h-[40px]  object-contain"
              />
            </div>
            <h4 className="text-lg font-semibold">{item.name}</h4>
          </div>
        ))}
      </div>

      {/* PreModal */}
      {showPreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {loadingModal ? (
            <ClipLoader color="#4A90E2" size={50} /> // Spinner while loading
          ) : (
            <PreModal
              wallet={selectedWallet}
              closeModal={closePreModal}
              proceedToModal={proceedToModal} // Proceed to Modal
            />
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Modal wallet={selectedWallet} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default Wallets;
