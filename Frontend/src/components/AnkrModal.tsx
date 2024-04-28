import React from "react";

import Ankr from "../../public/Ankrverify.png";
import Image from "next/image";

interface Props {
  handleVerify: () => void; // Define handleVerify prop as a function that takes no arguments and returns void
}

const AnkrModal: React.FC<Props> = ({ handleVerify }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full shadow-lg text-black">
        <div className="flex flex-col items-center mb-6">
          {" "}
          {/* Center the content and add spacing */}
          <Image
            src={Ankr}
            alt="Ankr Logo"
            className="w-full h-full object-contain mb-4" // Adjusted styling for the image
          />
          {/* Modal content */}
          <h2 className="text-2xl font-bold mb-4">
            {" "}
            {/* Adjusted font size and weight */}
            Terms & Conditions
          </h2>
          <ul className="list-disc mb-6 text-lg text-left">
            {" "}
            {/* Adjusted font size */}
            <li className="mb-2">
              This app is completely decentralized, we don't own your team data.
            </li>
            <li className="mb-2">We use Chainlink to generate scores.</li>
            <li>The user must be above 18 years to use this app.</li>
          </ul>
          <button
            className="bg-[#01A4F1] text-white px-6 py-3 rounded-md shadow-sm hover:bg-indigo-500 transition-colors duration-300"
            onClick={() => handleVerify()}
          >
            Verify with Ankr
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnkrModal;
