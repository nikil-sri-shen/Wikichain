import React from "react";
import { useState } from "react";
// import Web3 from "web3";

function Home() {
  const [connectedAccount, setConnectedAccount] = useState(null);

  const connectToMetaMask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          setConnectedAccount(accounts[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <div className="text-center fill-white p-10">Home</div>
      <div className="text-center">
        {connectedAccount ? (
          <p>Connected account: {connectedAccount}</p>
        ) : (
          <button
            onClick={connectToMetaMask}
            className="text-2xl"
          >
            Connect to MetaMask
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
