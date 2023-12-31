import React from "react";
import { useState, useEffect } from "react";
import { MdLogin } from "react-icons/md";
import web3 from "../../web3.js";
import decwiki from "../../decwiki.js";
import Loading from "../Loading.jsx";

function Registration() {
  const [userName, setUserName] = useState("");
  const [account, setAccount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
      } catch (error) {
        // Handle errors, e.g., log them or show an error message
        console.error("Error checking user registration:", error);
        setIsLoading(false);
      }
    };

    // Call the function to check user registration
    checkUserRegistration();
  }, [account]);

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
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <form
            onSubmit={handleRegistration}
            className="text-center p-32 hover:shadow-4xl m-40"
          >
            {transactionStatus && <p>{transactionStatus}</p>}
            {isUserRegistered ? (
              <div>
                <p className="text-white text-5xl">
                  ✅ You are already a registered user!!!
                </p>
              </div>
            ) : (
              <div>
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
                  <span className="flex">
                    <MdLogin size={28} className="mr-2" />
                    Register
                  </span>
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default Registration;
