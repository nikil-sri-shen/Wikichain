import React from "react";
import { useState } from "react";
// import Web3 from "web3";

function Home() {
  const [connectedAccount, setConnectedAccount] = useState("");

  const connectToMetaMask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setConnectedAccount(accounts[0].slice(0, 12));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-10 p-6 hover:shadow-4xl text-white rounded text-justify">
        <h2 className="text-3xl font-bold mb-4 text-center">DecWiki</h2>
        <h4 className="text-xl font-bold mb-4">Introduction</h4>
        <p className="mb-4">
          ⭐ Represents a revolutionary shift in knowledge-sharing platforms
        </p>
        <p className="mb-4">
          ⭐ Embracing decentralization ensures censorship resistance,
          transparency, and inclusivity in collaborative knowledge creation.
        </p>
        <p className="mb-4">
          ⭐ DecWiki is not controlled by a single entity. It combines a secure
          blockchain foundation for content storage.
        </p>
        <p className="mb-4">
          ⭐ It is a user-friendly DApp with a resilient consensus mechanism to
          maintain information integrity.
        </p>
        <p className="mb-4">
          ⭐ Empower wide contributors to shape a trustworthy and democratic
          repository of knowledge accessible to all.
        </p>
      </div>
      <div className="fixed left-0 bottom-0 text-center p-4">
        {connectedAccount ? (
          <p className="bg-black hover:bg-white text-white hover:text-gray-700 font-bold py-2 px-4 rounded">
            Connected account: {connectedAccount}...
          </p>
        ) : (
          <button
            onClick={connectToMetaMask}
            className="flex bg-black hover:bg-white text-white hover:text-gray-700 font-bold py-2 px-4 rounded"
          >
            Connect to MetaMask
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
