import React from "react";
import { useState } from "react";
import web3 from "../../web3.js";
import decwiki from "../../decwiki.js";

function Registration() {
  const [userName, setUserName] = useState("");
  const [account, setAccount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const account = await web3.eth.getAccounts();
    setAccount(account);
    console.log(account);

    try {
      const user = await decwiki.methods.users(account[0]).call();
      if (!user.isRegistered) {
        // Call the registerUser method with the entered username
        const transaction = await decwiki.methods
          .registerUser(userName)
          .send({ from: account[0], gas: 3000000 });

        setTransactionStatus(
          `Transaction successful! Transaction hash: ${transaction.transactionHash}`
        );

        // Optionally, you can add code here to handle success, e.g., show a success message
        console.log(`User ${userName} registered successfully!`);
      } else {
        setIsUserRegistered(user.isRegistered);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error registering user:", error);
      setTransactionStatus(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleRegistration} className="text-center p-32">
      {transactionStatus && <p>{transactionStatus}</p>}
      {isUserRegistered ? (
        <p className="text-green-700 text-3xl">
          ✅ User is already registered!
        </p>
      ) : (
        <p className="text-red-700 text-3xl"></p>
      )}
      <label className="text-3xl">
        User Name
        <br></br>
        <br></br>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="text-black"
        />
      </label>
      <br></br>
      <button
        type="submit"
        className="m-5 bg-black hover:bg-white text-white hover:text-gray-700 font-bold py-2 px-4 rounded"
      >
        Register
      </button>
    </form>
  );
}

export default Registration;
