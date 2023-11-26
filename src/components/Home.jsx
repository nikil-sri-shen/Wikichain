import React from "react";
import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";
// import Web3 from "web3";

function Home() {
  const [connectedAccount, setConnectedAccount] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call or any asynchronous operation
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(delay);
  }, []);

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
      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-20">
          <div className="max-w-6xl mx-auto mt-10 p-6 hover:shadow-4xl text-white rounded text-justify">
            <h2 className="text-4xl font-bold mb-4">
              DecWiki: A blockchain-enabled wiki framework based on
              participatory design
            </h2>
            <br />
            <p className="mb-4 text-xl">
              Welcome to DecWiki, a groundbreaking platform designed to
              revolutionize collaborative knowledge management through the
              integration of blockchain technology. In response to the
              limitations of centralized architectures and the challenges faced
              by traditional wiki-based applications, DecWiki introduces a
              decentralized and transparent framework, reshaping the landscape
              of information fusion. With the advantages of blockchain, DecWiki
              ensures the authenticity, reliability, and security of its
              knowledge base, providing a robust encyclopedia for users. The
              participatory design approach employed in DecWiki's development
              emphasizes stakeholder involvement, resulting in a user-centric
              experience and improved system acceptance. Join us on this journey
              to explore the future of collaborative knowledge creation, where
              transparency, trust, and innovation converge in the DecWiki
              ecosystem.
            </p>
          </div>
          <div className="max-w-6xl mx-auto mt-10 p-6 hover:shadow-4xl text-white rounded text-justify">
            <h2 className="text-3xl font-bold mb-4">
              Services provided by DecWiki
            </h2>
            <br />
            <p className="mb-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded shadow-4xl hover:shadow-md">
                  <a href="/publish">Publish Articles</a>
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md">
                  <a href="/search">Search Articles</a>
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md">
                  <a href="/search">Vote Articles</a>
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md">
                  <a href="/search">Verify Articles</a>
                </div>
              </div>
            </p>
          </div>
          <div className="max-w-6xl mx-auto mt-10 p-6 hover:shadow-4xl text-white rounded text-justify">
            <h2 className="text-3xl font-bold mb-4">
              Technologies used in DecWiki
            </h2>
            <br />
            <p className="mb-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded shadow-4xl hover:shadow-mdtext-lg">
                  <a
                    href="https://ethereum.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex"
                  >
                    <img src="ethereum.png" className="h-10 w-6 mr-6"></img>
                    Ethereum Blockchain
                  </a>
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md text-xl">
                  <a
                    href="https://react.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex"
                  >
                    <img src="react.png" className="h-10 w-10 mr-6"></img>
                    React js
                  </a>
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md">
                  <a
                    href="https://tailwindcss.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="tailwind.png" className="h-10 w-30"></img>
                  </a>
                </div>
                <div className="p-4 rounded shadow-4xl hover:shadow-md text-xl">
                  <a
                    href="https://sepolia.etherscan.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex"
                  >
                    <img src="sepolia.png" className="h-10 w-6 mr-6"></img>
                    Sepolia Testnet
                  </a>
                </div>
              </div>
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
      )}
    </div>
  );
}

export default Home;
