import React from "react";
import { useState, useEffect } from "react";
import web3 from "../../web3.js";
import decwiki from "../../decwiki.js";
import { IoMdCreate } from "react-icons/io";

function Publish() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [account, setAccount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");

  useEffect(() => {
    const checkUserRegistration = async () => {
      const account = await web3.eth.getAccounts();
      setAccount(account);
      try {
        // Assuming `wiki` is your contract instance
        // console.log(account);
        const user = await decwiki.methods.users(account[0]).call();

        // Check if the user is registered based on your contract logic
        const userIsRegistered = user && user.isRegistered;
        // Update state accordingly
        setIsUserRegistered(userIsRegistered);
      } catch (error) {
        // Handle errors, e.g., log them or show an error message
        console.error("Error checking user registration:", error);
      }
    };

    // Call the function to check user registration
    checkUserRegistration();
  }, [account]);

  const handlePublish = async () => {
    try {
      // Get the current Ethereum account
      const account = await web3.eth.getAccounts();
      // const user = await wiki.methods.users(account[0]).call();

      // Call the publishArticle function in the smart contract
      const transaction = await decwiki.methods
        .publishArticle(title, content)
        .send({
          from: account[0],
          gas: 3000000,
        });
      console.log(transaction);
      setTransactionStatus(
        `Transaction successful! Transaction hash: ${transaction.transactionHash}`
      );

      console.log("Article published successfully!");
    } catch (error) {
      console.error("Error publishing article:", error);
    }
  };
  return (
    <div className="text-center p-10">
      <h2 className="text-3xl">Publish Article</h2>
      {transactionStatus && <p>{transactionStatus}</p>}
      {isUserRegistered ? (
        <p className="text-green-700 text-3xl"></p>
      ) : (
        <p className="text-red-700 text-3xl">⚠️ User is not registered!!!</p>
      )}
      <br></br>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-lg text-black"
      ></input>
      <br></br>
      <br></br>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="rounded-lg text-black"
        cols={50}
        rows={15}
      />
      <br></br>
      <button
        onClick={handlePublish}
        className="m-5 bg-black hover:bg-white text-white hover:text-gray-700 font-bold py-2 px-4 rounded"
      >
        <span className="flex">
          <IoMdCreate size={24} className="mr-2" />
          Publish
        </span>
      </button>
    </div>
  );
}

export default Publish;
