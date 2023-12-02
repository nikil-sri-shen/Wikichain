import React from "react";
import { useState, useEffect } from "react";
import web3 from "../../web3.js";
import decwiki from "../../decwiki.js";
import { IoMdCreate } from "react-icons/io";
import Loading from "../Loading.jsx";

function Publish() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [account, setAccount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrorMessage] = useState("");
  // const [isQueried, setIsQuried] = useState(false);

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

  const handlePublish = async () => {
    try {
      // Get the current Ethereum account
      const account = await web3.eth.getAccounts();

      // Call the publishArticle function in the smart contract

      const transaction = await decwiki.methods
        .publishArticle(title, content)
        .send({
          from: account[0],
          gas: 3000000,
        });
      console.log(transaction);
      setTransactionStatus("Transaction successful!!!");
      console.log("Article published successfully!");
    } catch (error) {
      // Handle errors, e.g., show an error message
      if (error.message.includes("reverted")) {
        setErrorMessage("⚠️ Sorry, Article already exist...!");
      } else {
        // Handle other types of errors
        console.error(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="text-center p-6">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="hover:shadow-4xl m-28">
          {errMsg && <p className="text-5xl p-10">{errMsg}</p>}
          {transactionStatus && <p>{transactionStatus}</p>}
          {isUserRegistered ? (
            <div>
              <h2 className="text-4xl text-black">Publish Article</h2>
              <br></br>
              <label className="text-black text-2xl">Title</label>
              <br></br>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-lg text-black"
              ></input>
              <br></br>
              <label className="text-black text-2xl">Content</label>
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
          ) : (
            <div className="py-48 text-center justify-center">
              <p className="text-red-700 text-5xl">
                ⚠️ You are not a registered User!!!
              </p>
              <br></br>
              <p className="text-3xl">Please Register here 👇🏼:</p>
              <br></br>
              <a href="/registration" className="text-3xl">
                Click Here
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Publish;
